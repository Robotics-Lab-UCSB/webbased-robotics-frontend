import React, { useState } from "react"

interface TaskBarProps {

}

const TaskBar: React.FC<TaskBarProps> = ({ }) => {
    const [taskBarOpen, setTaskBarOpen] = useState(false)

    const toggleTaskBar = () => {
        setTaskBarOpen((prev) => !prev)
    }

    return (
        <div>
            <button onClick={toggleTaskBar}>Toggle TaskBar</button>
            {taskBarOpen && (
                <div className="taskbar">
                    TaskBar is now open!
                </div>
            )}
        </div>
    )
}

export default TaskBar
