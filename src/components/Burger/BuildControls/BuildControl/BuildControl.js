import React from 'react'

import classes from './BuildControl.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.label}>{props.label}</div>
        <button
            style={{ borderRadius: '10px' }}
            className={classes.Less}
            onClick={props.removed}
            disabled={props.disabled}
        >
            less
        </button>
        <button
            style={{ borderRadius: '10px' }}
            className={classes.More}
            onClick={props.added}
        >
            more
        </button>
    </div>
)

export default buildControl
