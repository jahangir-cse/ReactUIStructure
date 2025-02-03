import React from 'react';

const CommonTable = ({ columns, data, actions }) => {
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
                                <td key={colIndex}>{row[column.accessor]}</td>
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