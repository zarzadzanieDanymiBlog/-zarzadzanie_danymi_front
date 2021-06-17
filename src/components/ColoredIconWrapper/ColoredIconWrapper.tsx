import { StyledColoredIconWrapper } from "./ColoredIconWrapper.styled";

export interface ColoredIconWrapperProps {
  color: string;
  children: React.ReactNode;
}
/**
 * Komponent pozwalający na zmianę domyślnego koloru ikony przekazywanej jako jego właściwość o nazwie children
 * @param {string}  color - parametr określający color ikony
 * @param {React.ReactNode} children - przekazywana ikona (można też przekazać string)
 * */
const ColoredIconWrapper = ({
  color = "primary",
  children,
  ...rest
}: ColoredIconWrapperProps) => {
  return (
    <StyledColoredIconWrapper color={color} {...rest}>
      {children}
    </StyledColoredIconWrapper>
  );
};

export default ColoredIconWrapper;
