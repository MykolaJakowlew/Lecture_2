import './loading.css';
const Loading = () => {
 return (
  <div style={{
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   background: 'rgba(0,0,0,0.25)',
   width: '100%',
   height: '100%',
   position: 'absolute',
   top: 0,
   left: 0,
  }}>
   <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
  </div>
 );
};

export default Loading;