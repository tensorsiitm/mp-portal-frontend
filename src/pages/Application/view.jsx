import React, { useEffect, useState } from 'react';
import { useCreateCommentMutation, useGetApplicationsQuery } from '../../generated/graphql.tsx';

const ApplicationView = () => {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
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

  const handleAddComment = async (appId, comment) => {
    // you will write this function
      const put = await createCommentMutation({variables: {
        data: {
          appId, comment
        }
      }})

      if(put.data.createComment) {
        alert("Comment added")
        setApplications((prev) => prev.map((app) =>
          app.appId === appId
            ? {
                ...app,
                comments: [...(app.comments || []), comment],
              }
            : app))
      }
  };

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

  const submitComment = (appId) => {
    const comment = commentInputs[appId];
    if (comment && comment.trim()) {
      handleAddComment(appId, comment.trim());
      setCommentInputs(prev => ({ ...prev, [appId]: '' }));
      setShowCommentBoxes(prev => ({ ...prev, [appId]: false }));
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
      <div className="flex flex-col gap-8">
        {filteredData.length > 0 ? filteredData.map((item, index) => {
          const date = new Date(item.creationDate)
          return (
          <div
            key={index}
            className="w-[50vw] border p-4 rounded-lg shadow-md bg-gray-100"
          >
            <p><strong>ID:</strong> {item.appId}</p>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Aadhaar:</strong> {item.aadhaar}</p>
            <p><strong>Phone:</strong> {item.phone}</p>
            <p><strong>Address:</strong> {item.address}</p>
            <p><strong>Issue:</strong> {item.issue}</p>
            <p><strong>Remarks:</strong> {item.remarks}</p>
            <p><strong>Date:</strong> {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</p>
            <p><strong>Expected Expenditure:</strong> {item.expectedExpenditure}</p>

            {/* Comments */}
            {item.comments && item.comments.length > 0 && (
              <div className="mt-4">
                <strong>Comments:</strong>
                <ul className="list-disc list-inside mt-1">
                  {item.comments.map((comment, i) => (
                    <li key={i}>{comment}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add Comment Button */}
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => toggleCommentBox(item.appId)}
            >
              {showCommentBoxes[item.appId] ? 'Cancel' : 'Add Comment'}
            </button>

            {/* Comment Input Box */}
            {showCommentBoxes[item.appId] && (
              <div className="mt-2 flex flex-col gap-2">
                <textarea
                  value={commentInputs[item.appId] || ''}
                  onChange={(e) => handleCommentChange(item.appId, e.target.value)}
                  placeholder="Enter your comment..."
                  className="p-2 border rounded-lg w-full resize-none"
                />
                <button
                  onClick={() => submitComment(item.appId)}
                  className="self-start px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        )
        }) :
          <h1>No Data Found!</h1>}
      </div>
    </div>
  );
};

export default ApplicationView;
