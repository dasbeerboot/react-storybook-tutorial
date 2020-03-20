/** @jsx jsx */
import { Fragment } from 'react';
import { css, jsx } from '@emotion/core';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import Button from '../Button/Button';
import PropTypes from 'prop-types';
import { useTransition, animated } from 'react-spring';

const Dialog = (
    {
        visible,
        title,
        description,
        hideButtons,
        cancellable,
        cancelText,
        confirmText,
        children,
        onCancel,
        onConfirm
    }
) => {
    // useTransition으로 단순히 가시성을 설정 할 때에는 boolean 을 넣고, 배열의 변화함에 따라 트랜지션을 주며 추가/제거를 하고 싶을 때는 배열을 넣음
    const fadeTransition = useTransition(visible, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

    const slideUpTransition = useTransition(visible, null, {
        config: { mass: 15, tenstion: 90, friction: 50 },
        from: {
            transform: `translateY(200px) scale(0.8)`,
            opacity: 0
        },
        enter: {
            transform: `translateY(0px) scale(1)`,
            opacity: 1
        },
        leave: {
            transform: `translateY(200px) scale(0.8)`,
            opacity: 0
        }
    });

    return (
        <Fragment>
            {fadeTransition.map(({ item, key, props }) =>
                item ? (
                    <animated.div
                        css={[fullscreen, darkLayer]}
                        key={key}
                        style={props}
                    >
                    </animated.div>
                ) : null
            )};

            {slideUpTransition.map(({ item, key, props }) =>
                item ? (
                    <animated.div
                        css={[fullscreen, whiteBoxWrapper]}
                        style={props}
                        key={key}
                    >
                        <div css={whiteBox}>
                            {title && <h3>{title}</h3>}
                            {description && <p>{description}</p>}
                            {children}
                            {!hideButtons && (
                                <ButtonGroup css={{ marginTop: '3rem' }} rightAlign>
                                    {cancellable && (
                                        <Button theme="tertiary" onClick={onCancel}>
                                            {cancelText}
                                        </Button>
                                    )}
                                    <Button onClick={onConfirm}>{confirmText}</Button>
                                </ButtonGroup>
                            )}
                        </div>
                    </animated.div>
                ) : null
            )};
        </Fragment>
    );
};

Dialog.propTypes = {
    visible: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    hideButtons: PropTypes.bool,
    cancellable: PropTypes.bool,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
};

Dialog.defaultProps = {
    cancelText: '취소',
    confirmText: '확인'
};

const fullscreen = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const darkLayer = css`
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
`;

const whiteBoxWrapper = css`
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const whiteBox = css`
  box-sizing: border-box;
  border-radius: 4px;
  width: 25rem;
  background: white;
  box-shadow: 0px 4px 8px 8px rgba(0, 0, 0, 0.05);
  padding: 2rem;

  h3 {
    font-size: 1.5rem;
    color: #343a40;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.125rem;
    margin: 0;
    color: #868e96;
  }
`;

export default Dialog;