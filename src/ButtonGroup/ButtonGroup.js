/** @jsx jsx */

import React from 'react';
import { css, jsx } from '@emotion/core';
import PropTypes from 'prop-types';

const ButtonGroup = ({
    direction,
    rightAlign,
    children,
    gap,
    className
  }) => {
      return (
        <div
        css={[{
            display: 'flex',
            flexDirection: direction
        },
            gapStyle(direction, gap),
            rightAlign && rightAlignStyle
        ]}
        className={className}
      >
          {children}
      </div>
      );
};

ButtonGroup.defaultProps = {
    direction: 'row',
    gap: '0.5rem'
};

ButtonGroup.propTypes = {
    /** 버튼을 보여줄 방향 */
  direction: 'row' | 'column',
  /** 버튼을 우측에 보여줍니다. */
  rightAlign: PropTypes.bool,
  /** 버튼과 버튼사이의 간격을 설정합니다. */
  gap: PropTypes.number | PropTypes.string,
  /** 버튼 그룹에서 보여줄 버튼들 */
  children: React.ReactNode,
  /* 스타일 커스터마이징 하고싶을 때 사용 */
  className: PropTypes.string
};

const gapStyle = (direction, gap) => {
    const marginType = direction === 'row' ? 'marginLeft' : 'marginTtop';
    return css({
        'button + button': {
            [marginType]: gap
        }
    });
};

const rightAlignStyle =css`
    justify-content: flex-end;
`;

export default ButtonGroup;

