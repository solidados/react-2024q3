import { Oval } from 'react-loader-spinner';

const Loader = () => {
  const wrapperStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  };

  return (
    <Oval
      visible={true}
      height="80"
      width="80"
      color="#007bff"
      secondaryColor="007bff"
      ariaLabel="oval-loading"
      wrapperStyle={wrapperStyle}
    />
  );
};

export default Loader;
