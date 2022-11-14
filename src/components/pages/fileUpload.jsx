import React, {useEffect} from 'react';
import PreLoader from '../common/loader';
import {uploadFile} from '../../services/fileUploadService';
import {getAvailableProviders} from '../../services/chartService';

const FileUpload = () => {

	const [isLoading, setIsLoading] = React.useState(true);
	const [file, setFile] = React.useState(null);
	const [symbols, setSymbols] = React.useState([]);
	const [selectedSymbol, setSelectedSymbol] = React.useState(null);
	const [timeIntervals, setTimeIntervals] = React.useState([]);
	const [selectedTimeInterval, setSelectedTimeInterval] = React.useState(null);

	useEffect(() => {
		getProviders();

		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, []);

	const getProviders = async () => {
		try {
			const { data } = await getAvailableProviders();

			const stockProvider = data.filter((item) => item.slug === 'stockbybm')[0];
			setSymbols(stockProvider?.symbols);
			setTimeIntervals(stockProvider?.providedTimeFrames);
			setSelectedTimeInterval(stockProvider?.providedTimeFrames[0]);
			setSelectedSymbol(stockProvider?.symbols[0]);
			console.log('response-----------------', stockProvider);
		} catch (ex) {
			console.log(ex);
		}
	};

	const myStyle1={
		backgroundImage: 'url(assets/img/white-bg.jpg)',
		backgroundSize: 'cover',
		height: '100vh',
		opacity: '0.9'
	};

	const myStyle2={
		backgroundColor:'rgba(255, 255, 255, 0.65)',
		// backgroundSize: 'cover',
		// height: '100vh',
		// opacity: '0.7'
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleSubmit = async () => {
		console.log('submit');
		try {
			const response = await uploadFile(file, selectedSymbol?._id, selectedTimeInterval);
		}catch (e) {
			console.log(e);
		}
	};

	return(
		<React.Fragment>
			<PreLoader isLoading={isLoading}/>
			<section
				id="watchlist"
				className="section overflow-hidden"
				style={{backgroundImage: 'url("assets/img/back3.webp")'}}
			>
				<div className='watchlist-container d-flex justify-content-center' style={myStyle1} >
					<div className='container d-flex justify-content-center'>
						<div className='mt-5 p-5 rounded-lg w-75 profile-shadow h-75' style={myStyle2}>
							<div className='mb-4 text-black-100 '>
								<h2 >Upload Stock Market Data</h2>
								<hr/>

								<form>
									<div className='row'>
										<div className="mb-2 col-md-6">
											<label htmlFor="exampleFormControlInput1" className="form-label">
												Select Symbol</label>
											<select className='form-control' required onSelect={(e) => setSelectedSymbol(e.target.value)}>
												{symbols.map((item) => (
													<option key={item._id} value={item}>{item.name}</option>
												))}
											</select>
										</div>
										<div className="mb-2 col-md-6">
											<label htmlFor="exampleFormControlInput1" className="form-label">
												Select Symbol</label>
											<select className='form-control' required onSelect={(e) => setSelectedTimeInterval(e.target.value)}>
												{timeIntervals.map((item) => (
													<option key={item} value={item}>{item}</option>
												))}
											</select>
										</div>
									</div>
									<div className="mb-2">
										<label className="form-label" htmlFor="customFile">Upload file below</label>
										<input type="file" required accept=".text/csv" className="form-control" id="customFile" onChange={handleFileChange}/>
									</div>
									<button className="btn btn-primary mt-3" onClick={handleSubmit}>Submit</button>
								</form>
							</div>
						</div>

					</div>
				</div>
			</section>

		</React.Fragment>
	);
};

export default FileUpload;