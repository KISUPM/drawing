import {
  Box,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Input,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  ReactSketchCanvas,
  type ReactSketchCanvasRef,
} from "react-sketch-canvas";

import { BsBrushFill, BsEraserFill } from "react-icons/bs";
import { BiUndo, BiRedo } from "react-icons/bi";
function App() {
  const [brushSize, setBrushSize] = useState(5);
  const [eraserSize, setEraserSize] = useState(5);
  const [eraseMode, setEraseMode] = useState(false);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const canvaRef = useRef(null);

  // const Control = (e: React.KeyboardEvent) => {
  //   const key = e.key.toLowerCase();
  //   if (key === "a") {
  //     if (posX - 5 >= 0) {
  //       setPosX((prev) => prev - 5);
  //     }
  //   }
  //   if (key === "d") {
  //     setPosX((prev) => prev + 5);
  //   }
  //   if (key === "w") {
  //     setPosY((prev) => prev + 5);
  //   }
  //   if (key === "s") {
  //     if (posY - 5 >= 0) {
  //       setPosY((prev) => prev - 5);
  //     }
  //   }
  // };

  return (
    <Box
      w="100vw"
      h="100dvh"
      bg="#232323"
      color="#fff"
      position="relative"
      overflow="hidden"
      tabIndex={1}
      p="1rem"
    >
      <Button
        onClick={() => {
          const CurrentElement: ReactSketchCanvasRef = canvaRef.current!;
          CurrentElement.clearCanvas();
        }}
      >
        Clear
      </Button>
      <Button
        onClick={() => {
          const CurrentElement: ReactSketchCanvasRef = canvaRef.current!;
          CurrentElement.undo();
        }}
      >
        <BiUndo />
      </Button>
      <Button
        onClick={() => {
          const CurrentElement: ReactSketchCanvasRef = canvaRef.current!;
          CurrentElement.redo();
        }}
      >
        <BiRedo />
      </Button>
      <Button
        onClick={() => {
          const CurrentElement: ReactSketchCanvasRef = canvaRef.current!;
          CurrentElement.eraseMode(!eraseMode);
          setEraseMode(!eraseMode);
        }}
      >
        {eraseMode ? <BsEraserFill /> : <BsBrushFill />}
      </Button>
      <MenuPanel
        setBrushSize={setBrushSize}
        brushSize={brushSize}
        eraserSize={eraserSize}
        setEraserSize={setEraserSize}
        eraseMode={eraseMode}
      />
      <Box
        position="relative"
        onMouseMove={(e) => {
          const x = e.clientX;
          const y = e.clientY;
          setPosX(x);
          setPosY(y);
        }}
      >
        <ReactSketchCanvas
          ref={canvaRef}
          width="100%"
          height="400px"
          strokeWidth={brushSize}
          eraserWidth={eraserSize}
          strokeColor="black"
        />
        <Box
          id="brushPointer"
          position="fixed"
          top={`${posY}px`}
          left={`${posX}px`}
          transform={"translate(-50%,-50%)"}
          bg="none"
          w={eraseMode ? `${eraserSize}px` : `${brushSize}px`}
          h={eraseMode ? `${eraserSize}px` : `${brushSize}px`}
          borderRadius={"50%"}
          border="1px solid #0005"
          // zIndex={10}
          // transition={"all 0.1s"}
          pointerEvents="none"
        ></Box>
      </Box>
    </Box>
  );
}

export default App;

interface PanelProps {
  eraseMode: boolean;
  brushSize: number;
  setBrushSize: (s: number) => void;
  eraserSize: number;
  setEraserSize: (s: number) => void;
}

const MenuPanel: React.FC<PanelProps> = (props) => {
  const { setBrushSize, brushSize, eraserSize, setEraserSize, eraseMode } =
    props;
  return (
    <Box display="flex" columnGap={"1rem"}>
      {/* ========================================================================= */}
      {eraseMode ? (
        <Box
          display="flex"
          justifyContent={"cetner"}
          alignItems={"center"}
          columnGap={"1rem"}
        >
          <Box
            w="20px"
            display="flex"
            justifyContent={"cetner"}
            alignItems={"center"}
          >
            <BsEraserFill />
          </Box>
          <Box w="80px">
            <Slider
              defaultValue={5}
              max={20}
              min={1}
              value={eraserSize}
              onChange={setEraserSize}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
          <Box>
            <Input
              type="number"
              value={eraserSize}
              onChange={(e) => {
                const v = Number(e.currentTarget.value);
                if (v <= 20 || v >= 1) {
                  setEraserSize(v);
                } else if (v < 1) {
                  setEraserSize(1);
                } else {
                  setEraserSize(20);
                }
              }}
              min={1}
              max={20}
            />
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent={"cetner"}
          alignItems={"center"}
          columnGap={"1rem"}
        >
          <Box
            w="20px"
            display="flex"
            justifyContent={"cetner"}
            alignItems={"center"}
          >
            <BsBrushFill />
          </Box>
          <Box w="80px">
            <Slider
              defaultValue={5}
              max={20}
              min={1}
              value={brushSize}
              onChange={setBrushSize}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
          <Box>
            <Input
              type="number"
              value={brushSize}
              onChange={(e) => {
                const v = Number(e.currentTarget.value);
                if (v <= 20 || v >= 1) {
                  setBrushSize(v);
                } else if (v < 1) {
                  setBrushSize(1);
                } else {
                  setBrushSize(20);
                }
              }}
              min={1}
              max={20}
            />
          </Box>
        </Box>
      )}

      {/* ========================================================================= */}

      {/* ========================================================================= */}
    </Box>
  );
};
