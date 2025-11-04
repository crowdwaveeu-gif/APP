import { useState } from "react";
import Select from "react-select";
import { toggleEditTaskModalOpen } from "../../redux/features/editTaskModalSlice";

import { toggleViewTaskModalOpen } from "../../redux/features/viewTaskModalSlice";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Option, TaskDataType } from "../../types";

type Props = {
  tableData: TaskDataType[];
  handleDelete: (id: number) => void;
};

const TaskTable = ({ tableData, handleDelete }: Props) => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  const dispatch = useAppDispatch();

  // State for managing the initial status and priority for each row
  const [initialStatus, setInitialStatus] = useState<{
    [key: number]: Option | null;
  }>({});
  const [initialPriority, setInitialPriority] = useState<{
    [key: number]: Option | null;
  }>({});

  const openEditModal = () => {
    dispatch(toggleEditTaskModalOpen());
  };

  const openTaskViewModal = () => {
    dispatch(toggleViewTaskModalOpen());
  };

  const statusOptions = [
    { value: "Not Started", label: "Not Started" },
    { value: "Pending", label: "Pending" },
    { value: "On Hold", label: "On Hold" },
    { value: "In Progress", label: "In Progress" },
    { value: "Completed", label: "Completed" },
  ];

  const priorityOptions = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
    { value: "Urgent", label: "Urgent" },
  ];

  const handleStatusChange = (selectedOption: Option | null, id: number) => {
    setInitialStatus((prevState) => ({
      ...prevState,
      [id]: selectedOption,
    }));
  };

  const handlePriorityChange = (selectedOption: Option | null, id: number) => {
    setInitialPriority((prevState) => ({
      ...prevState,
      [id]: selectedOption,
    }));
  };

  return (
    <table
      className="table table-dashed table-hover digi-dataTable task-table"
      id="taskTable"
    >
      <thead>
        <tr>
          <th className="no-sort">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="markAllLeads"
              />
            </div>
          </th>
          <th>Name</th>
          <th>Status</th>
          <th>Start Date</th>
          <th>Due Date</th>
          <th>Assigned To</th>
          <th>Priority</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((data) => (
          <tr key={data.id}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </td>
            <td>
              <a
                role="button"
                className="text-decoration-underline"
                onClick={openTaskViewModal}
              >
                {data.taskName}
              </a>
            </td>
            <td>
              <Select
                options={statusOptions}
                value={initialStatus[data.id] || null}
                placeholder={data.status}
                onChange={(selectedOption) =>
                  handleStatusChange(selectedOption as Option, data.id)
                }
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "transparent",
                    color: darkMode ? "#c4c4c4" : "#222222",
                    fontSize: 14,
                    borderColor: darkMode
                      ? "rgba(255, 255, 255, 0.12)"
                      : "#dbeaea",
                  }),
                }}
              />
            </td>
            <td>{data.startDate}</td>
            <td>{data.dueDate}</td>
            <td>
              <div className="avatar-box">{data.assignedTo}</div>
            </td>
            <td>
              <Select
                options={priorityOptions}
                value={initialPriority[data.id] || null}
                onChange={(selectedOption) =>
                  handlePriorityChange(selectedOption as Option, data.id)
                }
                placeholder={data.priority}
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: "transparent",
                    color: darkMode ? "#c4c4c4" : "#222222",
                    fontSize: 14,
                    borderColor: darkMode
                      ? "rgba(255, 255, 255, 0.12)"
                      : "#dbeaea",
                  }),
                }}
              />
            </td>
            <td>
              <div className="btn-box">
                <button
                  className="btn btn-sm btn-icon btn-primary"
                  onClick={openEditModal}
                >
                  <i className="fa-light fa-edit"></i>
                </button>
                <button
                  className="btn btn-sm btn-icon btn-danger"
                  onClick={() => handleDelete(data.id)}
                >
                  <i className="fa-light fa-trash-can"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
