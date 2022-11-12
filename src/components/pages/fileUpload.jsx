import React, {useEffect} from 'react';
import PreLoader from '../common/loader';

const FileUpload = () => {

	const [isLoading, setIsLoading] = React.useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	});

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
						<div className='mt-5 p-5 rounded-lg w-75 profile-shadow ' style={myStyle2}>
							<div className='mb-4 text-black-100 '>
								<h2 >Upload Stock Market Data</h2>
								<form>
									<label class="form-label" for="customFile">Upload stock market data</label>
									<input type="file" class="form-control" id="customFile" />
								</form>
								<hr/>
							</div>
						</div>

					</div>
				</div>
			</section>

		</React.Fragment>
	);
};

export default FileUpload;