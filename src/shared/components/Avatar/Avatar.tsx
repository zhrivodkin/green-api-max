import './Avatar.css';

type Props = {
  size?: 'small' | 'medium' | 'large';
  url?: string;
  userName?: string;
};

const Avatar = ({ size = 'medium', url, userName }: Props) => {
  const name = userName?.split(' ').map(word => word[0]).join('');
  return (
    // TODO: use classNames lib
    <div className={`avatar ${size} ${!url ? 'bordered' : ''}`}>
      {name ? <span>{name}</span> : '?'}
      {url && <img src={url} alt="Аватар пользователя" />}
    </div>
  );
};

export default Avatar;
