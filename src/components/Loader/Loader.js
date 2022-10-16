import { Wrap } from './Loader.styled';
import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Wrap>
      <ThreeDots
        height="120"
        width="120"
        radius="9"
        color="#FF0000"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </Wrap>
  );
};
