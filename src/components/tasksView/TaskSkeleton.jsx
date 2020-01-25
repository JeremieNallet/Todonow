import React from 'react';
import { range } from 'lodash';

const TaskSkeleton = () => {
    return (
        <div className="task-skeleton">
            {range(3).map((_, i) => (
                <div key={i} className="task-skeleton__cell">
                    {range(3).map((_, i) => (
                        <p key={i} className="task-skeleton__cell--stripe" />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TaskSkeleton;
