import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { optimizations } from '../../models/OptimizationModel.js';
import Swatch from './Swatch';

const AnimationVariants = {
  initial: {
    scale: 0,
    opacity: 0,
  },
  animateIn: {
    scale: [0, 0.9, 1],
    opacity: [0, 0.5, 1],
  },
  animateOut: {
    scale: [1, 0.9, 0],
    opacity: [1, 0.5, 0],
  },
};

export default function SwatchGroupView(props) {
  if (!props.model) return null;

  const optimization = optimizations.find((item) => item.name === props.delegate.optimization);

  return (
    <Container>
      <Title>{props.model.semantic}</Title>
      <Main className="ScaleView">
        {props.model.swatches.map((model, index) => {
          const currentWeight = optimization?.values[index]?.weight;

          return (
            <AnimatePresence initial={false} mode="sync">
              {currentWeight && (
                <motion.div
                  key={index}
                  initial={'initial'}
                  animate={'animateIn'}
                  exit={'animateOut'}
                  variants={AnimationVariants}
                >
                  <Swatch model={model} delegate={props.delegate} />
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </Main>
    </Container>
  );
}

const Container = styled.div`
  margin: 16px;
  display: flex;
`;

const Title = styled.div`
  flex: 0 0 100px;
  padding-top: 18px;
  font-weight: bold;
  font-size: 12px;
`;

const Main = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex: 1;
  background: white;
`;
