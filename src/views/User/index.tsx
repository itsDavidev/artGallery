import { Link, useParams } from 'react-router-dom';
import ButtonBack from '../../components/ButtonBack';
import useApi from '../../hooks/useApi';

import styles from './user.module.scss';
const User = () => {
	const { user } = useParams();
	const { data, loading } = useApi({
		enpoint: `/users/${user}`,
	});
	console.log(data);
	if (loading) return <h1>Cargando...</h1>;
	console.log(data);
	return (
		<div className={styles.containUser}>
			<ButtonBack path='/' />
			<picture className={styles.containImgUser}>
				<img
					src={data.profile_image.large}
					alt=''
					className={styles.imgContainUser}
				/>
			</picture>
			<div className={styles.cardUser}>
				<h1 className={styles.titleCardUser}>{data.name}</h1>
				<h2 className={styles.profileCardUser}>@{data.username}</h2>
				<section className={styles.infoCardUser}>
					<p>
						<strong>Likes</strong>
						<span>{data.total_likes}</span>
					</p>
					<p>
						<strong>Photos</strong>
						<span>{data.total_photos}</span>
					</p>
					<p>
						<strong>Seguidores</strong>
						<span>{data.followers_count}</span>
					</p>
				</section>
				<section className={styles.descriptionCardUser}>
					<p>{data.bio}</p>
				</section>
				<picture className={styles.photosCardUser}>
					{data.photos.map((photo: any) => {
						return (
							<Link
								to={`/foto/${photo.id}`}
								key={photo.id}
								className={styles.photoCard}>
								<img
									src={photo.urls.small}
									alt=''
									className={styles.imgCardUser}
								/>
							</Link>
						);
					})}
				</picture>
			</div>
		</div>
	);
};
export default User;
