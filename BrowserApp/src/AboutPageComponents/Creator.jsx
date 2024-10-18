import BgBlocks from "./bgBlocks";

const Creator = () => {
  return (
    <section
      id="Creator"
      style={{
        paddingTop: 120,
        width: "80%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div className="maxwidth30vw">
        
      <BgBlocks
        num={6}
        text={
          "Hello.\nMy name is Serhii and I \ndeveloped this application \n\nFor now, I am studying Front and Back-end development \nI hope my app will be usefull for you\n\nThanks for paying attention\nGlory to Ukraine"
        }
        ff={true}
      >

      </BgBlocks>
      </div>
      </section>
  );
};

export default Creator;
