import React from 'react'

const CustomIcon = ({ iconType, IconName, iconSize, iconColor }) => {
    const Tag = iconType;
    return (
        <Tag
            name={IconName}
            size={iconSize}
            color={iconColor}
            style={{ alignSelf: 'center' }}
        />
    )
}

export default CustomIcon
