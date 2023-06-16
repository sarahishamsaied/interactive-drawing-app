import React, { useEffect, useRef } from "react";

interface Props {
  color: string;
  stroke: number;
  clear: boolean;
  setClearClicked: React.Dispatch<React.SetStateAction<boolean>>;
  activeCursor: string;
}

export default function Board(props: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef<boolean>(false);
  const pointsRef = useRef<{ x: number; y: number }[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const sketchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log(props.activeCursor);
    console.log(sketchRef.current?.style);
    sketchRef.current!.style.cursor = props.activeCursor;
    console.log(sketchRef.current?.style);
  }, [props.activeCursor]);
  useEffect(() => {
    const canvas = canvasRef.current;
    var sketch_style = getComputedStyle(sketchRef.current!);
    canvas!.width = parseInt(sketch_style.getPropertyValue("width"));
    canvas!.height = parseInt(sketch_style.getPropertyValue("height"));
    console.log(canvas?.width, canvas?.height);
    sketchRef.current!.style.cursor = props.activeCursor; // Set the cursor style
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const handleMouseDown = (e: MouseEvent) => {
      const { offsetX, offsetY } = e;
      isDrawingRef.current = true;
      pointsRef.current = [{ x: offsetX, y: offsetY }];
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawingRef.current) return;
      const { offsetX, offsetY } = e;
      const newPoint = { x: offsetX, y: offsetY };
      pointsRef.current.push(newPoint);
      const context = canvas?.getContext("2d");
      if (context && pointsRef.current.length > 2) {
        const p1 = pointsRef.current[pointsRef.current.length - 3];
        const p2 = pointsRef.current[pointsRef.current.length - 2];
        const p3 = pointsRef.current[pointsRef.current.length - 1];
        if (props.activeCursor === "pencil-cursor") {
          console.log("pencil");
          context.strokeStyle = props.color;
        } else if (props.activeCursor === "eraser-cursor") {
          console.log("eraser");
          context.strokeStyle = "#ffffff";
        }

        context.lineWidth = props.stroke;
        context.lineCap = "round";
        context.lineJoin = "round";

        const segments = 10; // Number of segments to divide the line into
        const dx = (p3.x - p2.x) / segments;
        const dy = (p3.y - p2.y) / segments;

        context.beginPath();
        context.moveTo(p2.x, p2.y);
        for (let i = 0; i < segments; i++) {
          const x = p2.x + dx * i;
          const y = p2.y + dy * i;
          context.lineTo(x, y);
        }
        context.lineTo(p3.x, p3.y);
        context.stroke();
      }
    };

    const handleMouseUp = () => {
      isDrawingRef.current = false;
      pointsRef.current = [];
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [props.activeCursor, props.color, props.stroke]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    if (props.clear) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      props.setClearClicked(false);
    }
  }, [props, props.clear, props.setClearClicked, props.activeCursor]);
  //console.log(props.activeCursor);
  return (
    <div id="sketch" ref={sketchRef}>
      <canvas
        ref={canvasRef}
        width={500}
        height={1000}
        className={`${props.activeCursor}`}
      ></canvas>
    </div>
  );
}
