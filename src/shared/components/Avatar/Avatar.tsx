import './Avatar.css';

type Props = {
  size?: 'small' | 'medium' | 'large';
  url?: string;
  userName?: string;
};

const Avatar = ({ size = 'medium', url, userName }: Props) => {
  const initials = userName
    ?.split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase())
    .join('')
    .slice(0, 2);

  return (
    <div className={`avatar ${size} ${!url ? 'bordered' : ''}`}>
      {initials ? <span>{initials}</span> : '?'}
      {url && <img src={url} alt={userName ? `Аватар ${userName}` : 'Аватар пользователя'} />}
    </div>
  );
};

export default Avatar;
