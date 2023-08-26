export const Tabs = ({ items, activeItem, setActiveItem }: any) => (
  <div className="tabs">
    {items.map((_: any, i: number) => (
      <div
        key={i}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          width: "70px",
          margin: "0 4px",
        }}
        onClick={() => setActiveItem(i)}
      >
        <div
          style={{
            height: "1.5px",
            backgroundColor: "white",
            opacity: activeItem === i ? "100%" : "35%",
            borderRadius: "3px",
          }}
        />
      </div>
    ))}
  </div>
);
