import React from 'react';

const CommonTable = ({ columns, data, actions }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover table-striped">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column.header}</th>
                        ))}
                        {actions && <th>Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <td key={colIndex}>
                                    {column.type === "img" ? (
                                        <img
                                            src={row[column.accessor]} 
                                            alt="Slider"
                                            style={{ width: "100px", borderRadius: "2px" }}
                                            onError={(e) => e.target.style.display = "none"} // Hide if the image fails to load
                                        />
                                    ) : column.type === "date" ? (
                                        formatDate(row[column.accessor]) // Format the date if the column type is "date"
                                    ) : (
                                        row[column.accessor]
                                    )}
                                </td>
                            ))}
                            {actions && (
                                <td>
                                    {actions.map((action, actionIndex) => (
                                        <button
                                            key={actionIndex}
                                            className={`btn btn-sm ${action.className}`}
                                            onClick={() => action.onClick(row)}
                                        >
                                            {action.label}
                                        </button>
                                    ))}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CommonTable;