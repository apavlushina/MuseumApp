import styled from "styled-components";
import { easyMove } from "../../style-constants";

const Img = styled.div`
  position: relative;
  transition: transform 0.3s;
  animation: ${easyMove} 0.3s;

  &:hover {
    position: absolute;
    left: 10px;
    transform: scale(10);
  }
`;

export default Img;
