'use client';
import { Icon } from '@iconify/react';

const CustomIcon = ({ icon, ...rest }: { icon: string; [x: string]: any }) => {
	return <Icon icon={icon} height="auto" inline={true} {...rest} />;
};

export default CustomIcon;
