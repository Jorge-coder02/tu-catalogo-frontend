import styled, { css } from "styled-components";

const variants = {
  primary: css`
    background-color: #2563eb;
    color: white;
    &:hover {
      background-color: #1d4ed8;
    }
  `,
  secondary: css`
    background-color: #6b7280;
    color: white;
    &:hover {
      background-color: #4b5563;
    }
  `,
  danger: css`
    background-color: #dc2626;
    color: white;
    &:hover {
      background-color: #b91c1c;
    }
  `,
};

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  ${({ variant }) => variants[variant] || variants.primary}
`;

export default function Button({
  variant = "primary",
  onClick,
  children,
  className,
}) {
  return (
    <StyledButton variant={variant} onClick={onClick} className={className}>
      {children}
    </StyledButton>
  );
}
