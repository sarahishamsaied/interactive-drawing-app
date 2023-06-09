import React, { useEffect } from "react";
import { useRef } from "react";

interface Props {
  color: string | "#000000";
  stroke: number | 1;
  clear: boolean;
  setClearClicked: React.Dispatch<React.SetStateAction<boolean>>;
  activeCursor: string;
}

export default function Board(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sketchRef = useRef<HTMLDivElement>(null);
  const [lastX, setLastX] = React.useState<number | null>(null);
  const [lastY, setLastY] = React.useState<number | null>(null);
  const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);
  const [isDrawing, setIsDrawing] = React.useState<boolean>(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    var sketch_style = getComputedStyle(sketchRef.current!);
    canvas!.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas!.height = parseInt(sketch_style.getPropertyValue("height"));
    console.log(canvas?.width, canvas?.height);
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    // var sketch_style = getComputedStyle(sketchRef.current!);
    // canvas!.width = parseInt(sketch_style.getPropertyValue("width"));
    // canvas!.height = parseInt(sketch_style.getPropertyValue("height"));
    console.log(canvas?.width, canvas?.height);
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (props.clear) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      props.setClearClicked(false);
    }

    const handleMouseDown = (e: MouseEvent) => {
      setIsDrawing(true);
      setLastX(e.clientX - canvas.offsetLeft);
      setLastY(e.clientY - canvas.offsetTop);
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing || !ctx) {
        return;
      }
      // change cursor to crosshair
      ctx.strokeStyle = props.color;
      ctx.beginPath();
      ctx.moveTo(lastX!, lastY!);
      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx.stroke();
      ctx.lineWidth = props.stroke;
      ctx.lineCap = "round";
      ctx.imageSmoothingEnabled = true;
      ctx.lineJoin = "round";

      const timer = setTimeout(() => {
        let data = canvas.toDataURL("image/png");
        console.log(data);
      }, 1000);
      setTimer(timer);
      setLastX(e.clientX - canvas.offsetLeft);
      setLastY(e.clientY - canvas.offsetTop);
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      clearTimeout(timer!);
    };
  }, [
    isDrawing,
    lastX,
    lastY,
    props.color,
    props.clear,
    props,
    timer,
    props.activeCursor,
  ]);
  console.log(props.activeCursor);
  return (
    <div id="sketch" ref={sketchRef}>
      <canvas
        id="board"
        width="500"
        height="1000"
        ref={canvasRef}
        className={`${props.activeCursor}`}
      ></canvas>
    </div>
  );
}
