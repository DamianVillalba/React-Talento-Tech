import loadingImg from "../../assets/loading.gif"

const LoadingSpinner = () => {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<img alt="loading" src={loadingImg} className="max-w-lg max-h-lg" />
		</div>
	);
};

export default LoadingSpinner;