import React, { useEffect, useState } from 'react';
import { useCreateCommentMutation, useGetApplicationsQuery } from '../../generated/graphql.tsx';
import fileUrlGenerator from '../../utils/fileUpload.js';

const ApplicationView = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [commentFiles, setCommentFiles] = useState({});
  const [showCommentBoxes, setShowCommentBoxes] = useState({});
  const { data } = useGetApplicationsQuery();

  const [createCommentMutation] = useCreateCommentMutation();

  useEffect(() => {
    if (data) {
      setApplications(data.getApplications);
    }
  }, [data]);

  const filteredData = applications.filter(
    (item) =>
      item.appId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.aadhaar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const toggleCommentBox = (appId) => {
    setShowCommentBoxes(prev => ({
      ...prev,
      [appId]: !prev[appId]
    }));
  };

  const handleCommentChange = (appId, value) => {
    setCommentInputs(prev => ({
      ...prev,
      [appId]: value
    }));
  };

  const submitComment = async (appId) => {
    const [count, type, office, year] = appId.split("/");
    const comment = commentInputs[appId];
    const file = commentFiles[appId];

    if (!comment && !file) return;

    let finalComment = comment || "";

    if (file) {
      const uploadedUrl = await fileUrlGenerator(file, `${office}/${year}/${type}/${count}/${Date.now()}`);
      finalComment += ` [File](${uploadedUrl})`; // Markdown style or just raw link
    }

    const put = await createCommentMutation({
      variables: { data: { appId, comment: finalComment } },
    });

    if (put.data?.createComment) {
      alert("Comment added");

      setApplications((prev) =>
        prev.map((app) =>
          app.appId === appId
            ? { ...app, comments: [...(app.comments || []), finalComment] }
            : app
        )
      );

      setCommentInputs((prev) => ({ ...prev, [appId]: '' }));
      setCommentFiles((prev) => ({ ...prev, [appId]: null }));
      setShowCommentBoxes((prev) => ({ ...prev, [appId]: false }));
    }
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center text-left">
      <h1 className="text-2xl font-bold mb-4">View Applications</h1>
      <input
        type="text"
        placeholder="Search by Application ID, Aadhaar, Phone or Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded-lg w-[50vw] focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">App ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Aadhaar</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Address</th>
              <th className="p-2 border">Issue</th>
              <th className="p-2 border">Remarks</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Expected Expenditure</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => {
                const date = new Date(item.creationDate);
                return (
                  <React.Fragment key={index}>
                    <tr className="bg-white border-t">
                      <td className="p-2 border">{item.appId}</td>
                      <td className="p-2 border">{item.name}</td>
                      <td className="p-2 border">{item.aadhaar}</td>
                      <td className="p-2 border">{item.phone}</td>
                      <td className="p-2 border">{item.address}</td>
                      <td className="p-2 border">{item.issue}</td>
                      <td className="p-2 border">{item.remarks}</td>
                      <td className="p-2 border">
                        {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                      </td>
                      <td className="p-2 border">{item.expectedExpenditure}</td>
                      <td className="p-2 border text-center">
                        <button
                          onClick={() => toggleCommentBox(item.appId)}
                          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          {showCommentBoxes[item.appId] ? "Cancel" : "Comment"}
                        </button>
                      </td>
                    </tr>

                    {/* ✅ ADDED: Row for Comments & Input */}
                    {(item.comments || showCommentBoxes[item.appId]) && <tr className="bg-gray-50">
                      <td colSpan={10} className="p-4 border border-t-0">
                        <strong>Comments:</strong>
                        <ul className="list-disc list-inside mt-1">
                          {item.comments?.map((comment, i) => {
                            const parts = comment.split(/(\[File\]\(.*?\))/g);
                            return (
                              <li key={i}>
                                {parts.map((part, index) => {
                                  const match = part.match(/\[File\]\((.*?)\)/);
                                  if (match) {
                                    return (
                                      <a
                                        key={index}
                                        href={match[1]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline ml-1"
                                      >
                                        [View File]
                                      </a>
                                    );
                                  }
                                  return <span key={index}>{part}</span>;
                                })}
                              </li>
                            );
                          })}
                        </ul>

                        {showCommentBoxes[item.appId] && (
                          <div className="mt-4 flex flex-col gap-2">
                            <textarea
                              value={commentInputs[item.appId] || ''}
                              onChange={(e) =>
                                handleCommentChange(item.appId, e.target.value)
                              }
                              placeholder="Enter your comment..."
                              className="p-2 border rounded-lg w-full resize-none"
                            />

                            <input
                              type="file"
                              accept=".pdf,.jpg,.png,.docx"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                setCommentFiles((prev) => ({
                                  ...prev,
                                  [item.appId]: file,
                                }));
                              }}
                              className="text-sm"
                            />

                            {commentFiles[item.appId] && (
                              <span className="text-sm text-gray-600">
                                Attached: {commentFiles[item.appId].name}
                              </span>
                            )}

                            <button
                              onClick={() => submitComment(item.appId)}
                              className="self-start px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Submit
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={10} className="text-center p-4">
                  No Data Found!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationView;
