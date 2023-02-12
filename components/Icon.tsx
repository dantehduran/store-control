'use client';
import { Icon } from '@iconify/react';

const CustomIcon = ({ icon, ...rest }: { icon: string; [x: string]: any }) => {
	return (
		<div {...rest}>
			<Icon icon={icon} height="auto" />
		</div>
	);
};

export default CustomIcon;
