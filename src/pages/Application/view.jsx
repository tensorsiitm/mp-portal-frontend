import React, { useEffect, useState } from 'react';
import { useCreateCommentMutation, useGetApplicationsQuery, useGetEqQuery } from '../../generated/graphql.tsx';
import fileUrlGenerator from '../../utils/fileUpload.js';

const ApplicationView = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  const [commentFiles, setCommentFiles] = useState({});
  const [showCommentBoxes, setShowCommentBoxes] = useState({});
  const [filterType, setFilterType] = useState('');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null); 
  const { data } = useGetApplicationsQuery();
  const { data: eqData } = useGetEqQuery(); // Fetch EQ data

  const [createCommentMutation] = useCreateCommentMutation();

  useEffect(() => {
    if (data) {
      setApplications(data.getApplications);
    }
  }, [data]);

  const filteredData = applications.filter((item) => {
    const matchesSearchTerm =
      item.appId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.aadhaar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType ? item.type === filterType : true;

    const itemDate = new Date(item.creationDate);
    const matchesDateFrom = dateFrom ? itemDate >= new Date(dateFrom) : true;
    const matchesDateTo = dateTo ? itemDate <= new Date(dateTo) : true;

    return matchesSearchTerm && matchesType && matchesDateFrom && matchesDateTo;
  });

  // Prepare EQ data if filterType is 'EQ'
  const eqList = eqData?.getEQ || [];

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
    <div className="p-6 flex flex-col justify-center items-center text-left bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">View Applications</h1>
      <input
        type="text"
        placeholder="Search by Application ID, Aadhaar, Phone or Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 p-3 border rounded-lg w-full max-w-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
      <div className="flex flex-wrap gap-4 mb-6 w-full max-w-2xl">
        <div className="flex flex-col">
          <label htmlFor="filterType" className="text-sm font-medium text-gray-700 mb-1">Filter by Type:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            <option value="GNRL">GNRL</option>
            <option value="PMNRF">PMNRF</option>
            <option value="CMDRF">CMDRF</option>
            <option value="EQ">EQ</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="dateFrom" className="text-sm font-medium text-gray-700 mb-1">From:</label>
          <input
            type="date"
            value={dateFrom || ''}
            onChange={(e) => setDateFrom(e.target.value)}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="dateTo" className="text-sm font-medium text-gray-700 mb-1">To:</label>
          <input
            type="date"
            value={dateTo || ''}
            onChange={(e) => setDateTo(e.target.value)}
            className="p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto w-full max-w-6xl">
        {filterType === 'EQ' ? (
          <table className="min-w-full table-auto border border-gray-300 bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">Area</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">Train</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">PNR</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">Class</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">From</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">To</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">Number</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">Phone</th>
              </tr>
            </thead>
            <tbody>
              {eqList.length > 0 ? (
                eqList.map((eq, idx) => (
                  <tr key={eq.id || idx} className="hover:bg-gray-50">
                    <td className="px-2 py-1 border text-sm text-gray-800">{eq.id}</td>
                    <td className="px-2 py-1 border text-sm text-gray-800">{eq.name}</td>
                    <td className="px-2 py-1 border text-sm text-gray-800">{eq.area}</td>
                    <td className="px-2 py-1 border text-sm text-gray-800">{eq.train}</td>
                    <td className="px-2 py-1 border text-sm text-gray-800">
                      {new Date(eq.date).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-1 border text-sm text-gray-800">{eq.PNR}</td>
                    <td className="px-2 py-1 border text-sm text-gray-800">{eq.class}</td>
                    <td className="px-2 py-1 border text-sm text-gray-800">{eq.from}</td>
                    <td className="px-2 py-1 border text-sm text-gray-800">{eq.to}</td>
                    <td className="px-2 py-1 border text-sm text-gray-800">{eq.number}</td>
                    <td className="px-2 py-1 border text-sm text-gray-800">{eq.phone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="text-center p-6 text-gray-600">
                    No EQ Data Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full table-auto border border-gray-300 bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">App ID</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">Aadhaar</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">Phone</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">Address</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">Issue</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">Remarks</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">Date</th>
                <th className="px-2 py-1 border text-left text-sm font-medium text-gray-700">Expected Expenditure</th>
                <th className="px-2 py-1 border text-center text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => {
                  const date = new Date(item.creationDate);
                  return (
                    <React.Fragment key={index}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-2 py-1 border text-sm text-gray-800">{item.appId}</td>
                        <td className="px-2 py-1 border text-sm text-gray-800">{item.name}</td>
                        <td className="px-2 py-1 border text-sm text-gray-800">{item.aadhaar}</td>
                        <td className="px-2 py-1 border text-sm text-gray-800">{item.phone}</td>
                        <td className="px-2 py-1 border text-sm text-gray-800">{item.address}</td>
                        <td className="px-2 py-1 border text-sm text-gray-800">{item.issue}</td>
                        <td className="px-2 py-1 border text-sm text-gray-800">{item.remarks}</td>
                        <td className="px-2 py-1 border text-sm text-gray-800">
                          {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                        </td>
                        <td className="px-2 py-1 border text-sm text-gray-800">{item.expectedExpenditure}</td>
                        <td className="px-2 py-1 border text-center">
                          <button
                            onClick={() => toggleCommentBox(item.appId)}
                            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                          >
                            {showCommentBoxes[item.appId] ? "Cancel" : "Comment"}
                          </button>
                        </td>
                      </tr>
                      {(item.comments || showCommentBoxes[item.appId]) && (
                        <tr className="bg-gray-50">
                          <td colSpan={10} className="px-2 py-1 border border-t-0">
                            <strong className="block mb-2 text-gray-700">Comments:</strong>
                            <ul className="list-disc list-inside mb-4">
                              {item.comments?.map((comment, i) => {
                                const parts = comment.split(/(\[File\]\(.*?\))/g);
                                return (
                                  <li key={i} className="text-sm text-gray-800">
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
                              <div className="mt-4 flex flex-col gap-3">
                                <textarea
                                  value={commentInputs[item.appId] || ''}
                                  onChange={(e) =>
                                    handleCommentChange(item.appId, e.target.value)
                                  }
                                  placeholder="Enter your comment..."
                                  className="p-3 border rounded-lg w-full resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                  className="self-start px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                                >
                                  Submit
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={10} className="text-center p-6 text-gray-600">
                    No Data Found!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ApplicationView;
