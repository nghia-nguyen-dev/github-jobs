import clockIcon from 'assets/icons/clock.svg'
import {daysSincePost} from 'utils/helpers'

const PostDate = ({ created_at, className }) => {
	return (
		<div className={`PostDate PostDate--${className}`}>
			<img className="PostDate__clock-icon" src={clockIcon} />
			<p>{daysSincePost(created_at)}d</p>
		</div>
	);
};

export default PostDate;
