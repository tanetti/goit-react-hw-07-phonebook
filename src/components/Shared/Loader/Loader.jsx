import PropTypes from 'prop-types';
import { RotatingLines } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';
import { theme } from 'constants/theme';

export const Loader = ({ shouldShown, position }) => (
  <LoaderContainer shouldShown={shouldShown} position={position}>
    <RotatingLines
      strokeColor={theme.colors.mainAccent}
      strokeWidth="5"
      animationDuration="1"
      width="50"
      visible={true}
    />
  </LoaderContainer>
);

Loader.propTypes = {
  shouldShown: PropTypes.bool.isRequired,
};
