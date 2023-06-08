import React, { useEffect } from "react";
import { useRef } from "react";

interface Props {
  color: string | "#000000";
  stroke: number | 1;
}

export default function Board(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sketchRef = useRef<HTMLDivElement>(null);
  const [lastX, setLastX] = React.useState<number | null>(null);
  const [lastY, setLastY] = React.useState<number | null>(null);
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

    const handleMouseDown = (e: MouseEvent) => {
      setIsDrawing(true);
      setLastX(e.clientX - canvas.offsetLeft);
      setLastY(e.clientY - canvas.offsetTop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing || !ctx) return;
      ctx.strokeStyle = props.color;
      ctx.beginPath();
      ctx.moveTo(lastX!, lastY!);
      ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
      ctx.stroke();
      ctx.lineWidth = props.stroke;
      ctx.lineCap = "round";
      ctx.imageSmoothingEnabled = true;
      ctx.lineJoin = "round";

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
    };
  }, [isDrawing, lastX, lastY, props.color]);

  return (
    <div id="sketch" ref={sketchRef}>
      <canvas id="board" width="500" height="1000" ref={canvasRef}></canvas>
    </div>
  );
}
