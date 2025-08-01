"use client";
import React, { useEffect, useState } from "react";
// Reverted back to react-beautiful-dnd as requested.
// Note: This library is not officially supported in React 18+ and may cause issues.
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import BreadCrumb from "../../components/BreadCrumb";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";


// --- Constants ---
const STATUSES = [
  "Not Started",
  "Deferred",
  "In Progress",
  "Completed",
  "Waiting for input",
];

const statusColors = {
  "Not Started": "bg-blue-100 border-blue-300",
  "Deferred": "bg-purple-100 border-purple-300",
  "In Progress": "bg-yellow-100 border-yellow-300",
  "Completed": "bg-green-100 border-green-300",
  "Waiting for input": "bg-gray-200 border-gray-300",
};

// --- Mock Data ---
// In a real app, this would come from an API
const initialTasks = [
    { id: '1', title: "Get Approval from Manager", dueDate: "2025-03-09", priority: "Low", assignee: "Simon Morasca", createdBy: "Siva Sankar", organization: "Chapman", status: "Not Started" },
    { id: '2', title: "Register for upcoming CRM Webinar", dueDate: "2025-03-10", priority: "Low", assignee: "Kris Marrier", createdBy: "Siva Sankar", organization: "King (Sample)", status: "Deferred" },
    { id: '3', title: "Refer CRM Videos", dueDate: "2025-03-12", priority: "Normal", assignee: "Mitsue Tollner", createdBy: "Siva Sankar", organization: "Morlong Associates", status: "Deferred" },
    { id: '4', title: "Competitor Comparison Document", dueDate: "2025-03-08", priority: "Highest", assignee: "Capla Paprocki", createdBy: "Siva Sankar", organization: "Feltz Printing", status: "In Progress" },
    { id: '5', title: "Get Approval from Manager", dueDate: "2025-03-11", priority: "Normal", assignee: "Leota Dillard", createdBy: "Siva Sankar", organization: "Commercial Press", status: "In Progress" },
    { id: '6', title: "Get Approval from Manager", dueDate: "2025-03-17", priority: "High", assignee: "Kris Marrier", createdBy: "Siva Sankar", organization: "King (Sample)", status: "In Progress" },
    { id: '7', title: "Register for upcoming CRM Webinar", dueDate: "2025-03-13", priority: "Normal", assignee: "Kris Marrier", createdBy: "Siva Sankar", organization: "King (Sample)", status: "In Progress" },
    { id: '8', title: "Complete CRM Getting Started steps", dueDate: "2025-03-10", priority: "Highest", assignee: "John Butt", createdBy: "Siva Sankar", organization: "Benton", status: "Completed" },
    { id: '9', title: "Finalize Q1 Report", dueDate: "2025-03-13", priority: "Normal", assignee: "Theola Frey", createdBy: "Siva Sankar", organization: "Theola Frey Inc", status: "Completed" }
];

// --- Main Component ---
const Tasks = () => {
  // We will manage the board's state directly in the columns object.
  const [columns, setColumns] = useState({});
  const navigate=useNavigate()
  // This effect runs only once to initialize the board from the initial tasks.
  useEffect(() => {
    const initialColumns = {};
    STATUSES.forEach(status => {
      // Filter tasks for the current status
      initialColumns[status] = initialTasks.filter(task => task.status === status);
    });
    setColumns(initialColumns);
  }, []); // Empty dependency array ensures this runs only on mount.

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    // 1. Do nothing if the item is dropped outside a valid destination
    if (!destination) return;

    // 2. Handle reordering within the same column
    if (source.droppableId === destination.droppableId) {
      // If dropped at the same spot, do nothing
      if (source.index === destination.index) return;

      const column = columns[source.droppableId];
      const newTasks = Array.from(column);
      const [movedTask] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, movedTask);

      setColumns({
        ...columns,
        [source.droppableId]: newTasks,
      });
      // Here you could make an API call to save the new order
      console.log(`Task ${draggableId} reordered in ${source.droppableId}.`);

    } else {
      // 3. Handle moving an item to a different column
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];

      const sourceTasks = Array.from(sourceColumn);
      const destTasks = Array.from(destColumn);

      const [movedTask] = sourceTasks.splice(source.index, 1);

      // Update the status of the moved task
      movedTask.status = destination.droppableId;

      destTasks.splice(destination.index, 0, movedTask);

      setColumns({
        ...columns,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destTasks,
      });

      // API call to update the task's status
      console.log(`Task ${draggableId} moved from ${source.droppableId} to ${destination.droppableId}.`);
      // Example API call (uncomment in a real app)
      /*
      try {
        await axios.patch(`/api/tasks/${draggableId}`, {
          status: destination.droppableId,
        });
      } catch (error) {
        console.error("Failed to update task status", error);
        // Optionally, revert the state change on API failure
      }
      */
    }
  };

  return (
    <div className="bg-gray-50 max-w-[92vw]">
       <div className="flex items-center justify-between px-6 py-2">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold text-gray-900">Tasks</h1>
                    <BreadCrumb />
                </div>
                <Button
                        onClick={() => navigate("/tasks/create")}
                        className="bg-primary text-white "
                    >
                        <Plus className="mr-2 h-4 w-4" /> Create Task
                    </Button>
            </div>
        <main className="p-4 flex-1 min-w-0 overflow-hidden">
             <div className="flex w-inherted overflow-x-auto gap-4 pb-4">
              <DragDropContext onDragEnd={handleDragEnd}>
                {STATUSES.map((status) => (
                  <Droppable droppableId={status} key={status}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-w-[300px] w-[20%] flex-shrink-0 rounded-lg shadow-sm border ${statusColors[status]} transition-colors duration-200 ${snapshot.isDraggingOver ? 'bg-opacity-80' : 'bg-opacity-50'}`}
                      >
                        <div className="p-3 border-b border-inherit">
                           <h2 className="text-lg font-semibold text-gray-700">
                             {status} ({columns[status]?.length || 0})
                           </h2>
                        </div>
                        <div className="space-y-2 p-3 overflow-y-auto" style={{maxHeight: 'calc(100vh - 200px)'}}>
                          {columns[status]?.length > 0 ? (
                            columns[status].map((task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id.toString()}
                                index={index}
                              >
                                {(provided, snapshot) => (
                                  <div
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    className={`rounded-md bg-white p-4 text-sm shadow-md border hover:shadow-lg transition-shadow duration-200 ${snapshot.isDragging ? 'ring-2 ring-blue-500' : 'border-gray-200'}`}
                                  >
                                    <h3 className="font-semibold text-gray-800 mb-1">
                                      {task.title}
                                    </h3>
                                    <p className="text-xs text-gray-500 mb-2">
                                      Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </p>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className={`px-2 py-1 rounded-full font-medium ${
                                            task.priority === 'Highest' ? 'bg-red-100 text-red-700' :
                                            task.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                            task.priority === 'Normal' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                        }`}>
                                            {task.priority}
                                        </span>
                                        <span className="font-semibold text-gray-600">{task.assignee}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">
                                      {task.organization}
                                    </p>
                                  </div>
                                )}
                              </Draggable>
                            ))
                          ) : (
                            <div className="p-4 text-center text-sm text-gray-500">
                                No tasks here.
                            </div>
                          )}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                ))}
              </DragDropContext>
            </div>
        </main>
    </div>
  );
};

export default Tasks;
