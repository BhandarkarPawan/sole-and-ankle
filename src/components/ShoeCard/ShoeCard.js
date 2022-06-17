import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const TAG = {
  "new-release": {
    backgroundColor: COLORS.secondary,
    value: "Just Released!",
  },
  "on-sale": {
    backgroundColor: COLORS.primary,
    value: "Sale",
  },
  default: {},
};

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const tagStyles = TAG[variant];

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              "--color": variant === "on-sale" && COLORS.gray[700],
              "--line-decoration": variant == "on-sale" && "line-through",
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          <SalePrice
            style={{ "--display": variant === "on-sale" ? null : "none" }}
          >
            {formatPrice(salePrice)}
          </SalePrice>
        </Row>
        {variant == "new-release" && <NewTag>Just Released!</NewTag>}
        {variant == "on-sale" && <SaleTag>Sale</SaleTag>}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const Tag = styled.div`
  position: absolute;
  background-color: red;
  top: 12px;
  right: -4px;
  padding: 8px 12px;
  border-radius: 2px;
  font-weight: 700;
  font-size: ${14 / 18}rem;
  color: ${COLORS.white};
`;

const SaleTag = styled(Tag)`
  background-color: ${COLORS.primary};
`;

const NewTag = styled(Tag)`
  background-color: ${COLORS.secondary};
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--line-decoration);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  display: var(--display);
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
