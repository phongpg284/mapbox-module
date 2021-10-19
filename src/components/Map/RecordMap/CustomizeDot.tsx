const CustomizeDot = (props: any) => {
  const { cx, cy, payload, index, color } = props;
  return (
    <>
      {index % 10000 === 0 && (
        <circle
          cx={cx}
          cy={cy}
          r={4}
          stroke={color}
          strokeWidth={2}
          fill="white"
        />
      )}
    </>
  );
};
export default CustomizeDot;
