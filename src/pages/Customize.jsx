import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, Textbox, Image as FabricImage, Rect } from "fabric";
import * as fabric from "fabric";
import axios from "axios";
export default function Customize() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [selected, setSelected] = useState(null);
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(20);
  const [product, setProduct] = useState("tshirt");
  const [fontFamily, setFontFamily] = useState("Arial");
  
 const navigate = useNavigate();

  const PRODUCTS = {
    tshirt: {
      label: "T-Shirt",
      image: "/custom-tshirt2.jpg",
      printArea: { left: 300, top: 200, width: 200, height: 220 },
    },
    mug: {
      label: "Mug",
      image: "/custom-mug1.jpg",
      printArea: { left: 280, top: 360, width: 250, height: 180 },
    },
     pillow: {
      label: "Pillow",
      image: "/pillow1.jpeg",
      printArea: { left: 280, top: 360, width: 250, height: 180 },
    },
   jersy: {
      label: "Jersy",
      image: "/jersy1.jpeg",
      printArea: { left: 280, top: 360, width: 250, height: 180 },
    },
    keychain: {
      label: "Keychain",
      image: "/keychain1.jpeg",
      printArea: { left: 280, top: 360, width: 250, height: 180 },
    },
    pot: {
      label: "Pot",
      image: "/pot1.jpeg",
      printArea: { left: 280, top: 360, width: 250, height: 180 },
    },
    
    
  };

  // ✅ LOAD MOCKUP
  const loadMockup = (type, c) => {
    const imgElement = new window.Image();
    imgElement.crossOrigin = "anonymous";
    imgElement.src = PRODUCTS[type].image;

    imgElement.onload = () => {
      const img = new FabricImage(imgElement);

      const old = c.getObjects().find((o) => o.isMockup);
      if (old) c.remove(old);

      const scale = Math.min(
        c.getWidth() / img.width,
        c.getHeight() / img.height
      );

      img.set({
        originX: "center",
        originY: "center",
        left: c.getWidth() / 2,
        top: c.getHeight() / 2,
        scaleX: scale,
        scaleY: scale,
        selectable: false,
        evented: false,
        isMockup: true,
      });

      c.add(img); // ✅ no moveTo
      c.requestRenderAll();
    };
  };

  // ✅ INIT CANVAS
  useEffect(() => {
    if (!canvasRef.current) return;

    const c = new Canvas(canvasRef.current, {
      width: 600,
      height: 700,
    });

    setCanvas(c);
    loadMockup(product, c);
    // ✅ ADD HERE

c.on("mouse:down", (e) => {
  if (e.target) {
    c.setActiveObject(e.target);
    c.requestRenderAll();
  }
});

c.on("selection:created", (e) => {
  const obj = e.selected[0];
  setSelected(obj);

  if (obj.type === "textbox") {
    setTextColor(obj.fill || "#000000");
  }
});

c.on("selection:updated", (e) => {
  const obj = e.selected[0];
  setSelected(obj);

  if (obj.type === "textbox") {
    setTextColor(obj.fill || "#000000");
  }
});

    // ✅ movement restriction
    c.on("object:moving", (e) => {
      const obj = e.target;
      if (!obj) return;

      const area = PRODUCTS[product].printArea;

      const objWidth = obj.width * obj.scaleX;
      const objHeight = obj.height * obj.scaleY;

      const bounds = {
        left: area.left,
        top: area.top,
        right: area.left + area.width,
        bottom: area.top + area.height,
      };

      if (obj.left < bounds.left) obj.left = bounds.left;
      if (obj.top < bounds.top) obj.top = bounds.top;

      if (obj.left + objWidth > bounds.right) {
        obj.left = bounds.right - objWidth;
      }

      if (obj.top + objHeight > bounds.bottom) {
        obj.top = bounds.bottom - objHeight;
      }
    });

    // selection
    c.on("selection:created", (e) => setSelected(e.selected[0]));
    c.on("selection:updated", (e) => setSelected(e.selected[0]));
    c.on("selection:cleared", () => setSelected(null));

    return () => c.dispose();
  }, []);

  // ✅ UPDATE MOCKUP + PRINT AREA
  useEffect(() => {
    if (!canvas) return;

    const area = PRODUCTS[product].printArea;

    loadMockup(product, canvas);

    // remove old print area
    const old = canvas.getObjects().find((o) => o.isPrintArea);
    if (old) canvas.remove(old);

    const rect = new Rect({
      left: area.left,
      top: area.top,
      width: area.width,
      height: area.height,
      fill: "rgba(25,118,210,0.08)",
      stroke: "#1976d2",
      strokeDashArray: [6, 4],
      selectable: false,
      evented: false,
      isPrintArea: true,
    });

    canvas.add(rect);
    canvas.requestRenderAll();
  }, [product, canvas]);

  // ✅ ADD TEXT
  const addText = () => {
  if (!canvas) return;
const text = new Textbox("your text here", {
  left: 100,
  top: 100,
  fontSize: fontSize,
  fill: textColor,
  fontFamily: fontFamily,
});
  canvas.add(text);
  canvas.setActiveObject(text);
  text.bringToFront();
canvas.requestRenderAll();// 🔥 ADD THIS
};

  // ✅ UPLOAD IMAGE (CENTERED)
  const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (!file || !canvas) return;

  const reader = new FileReader();

  reader.onload = () => {
    const imgEl = new window.Image();
    imgEl.src = reader.result;

    imgEl.onload = () => {
      const img = new FabricImage(imgEl);

      const area = PRODUCTS[product].printArea;

      // ✅ Better scaling (always visible)
      const maxWidth = area.width * 0.8;
      const scale = maxWidth / img.width;

      img.set({
        originX: "center",
        originY: "center",
        left: area.left + area.width / 2,
        top: area.top + area.height / 2,
        scaleX: scale,
        scaleY: scale,
      });

      canvas.add(img);

      // 🔥 IMPORTANT: bring to front
      canvas.setActiveObject(img);
    img.bringToFront();

      canvas.requestRenderAll();
    };
  };

  reader.readAsDataURL(file);
};
  
  const deleteObject = () => {
    if (!canvas || !selected) return;
    canvas.remove(selected);
    setSelected(null);
  };
  const changeFontSize = (size) => {
    setFontSize(size);
    if (selected && selected.type === "textbox") {
      selected.set("fontSize", Number(size));
      canvas.requestRenderAll();
    }
  };
  const saveDesign = () => {
  if (!canvas) {
    alert("Canvas not ready");
    return;
  }
  
  const preview = canvas.toDataURL({
  format: "jpeg",
  quality: 0.5,
});
  const oldDesigns =
    JSON.parse(localStorage.getItem("myDesigns")) || [];

  const newDesign = {
    _id: Date.now().toString(),
    preview: preview,
    product: product,
    price: 499,
    quantity: 1,
  };

  const updatedDesigns = [...oldDesigns, newDesign];

  localStorage.setItem(
    "myDesigns",
    JSON.stringify(updatedDesigns)
  );

  console.log("Saved:", updatedDesigns);

  navigate("/my-designs");
};

  const downloadImage = () => {
    if (!canvas) return;

    const dataURL = canvas.toDataURL({ format: "png", multiplier: 2 });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "design.png";
    link.click();
  };
 const handleColorChange = (color) => {
  setTextColor(color);

  if (!canvas) return;

  const obj = canvas.getActiveObject();

  if (obj && obj.type === "textbox") {
    obj.set({
      fill: color,
      dirty: true, // 🔥 force update
    });

    canvas.renderAll(); // 🔥 use renderAll instead
  }
};
 
const changeImageColor = (color) => {
  if (!canvas) return;

  const obj = canvas.getActiveObject();

  if (obj && obj.type === "image") {
    obj.filters = [];

    obj.filters.push(
      new fabric.filters.BlendColor({
        color: color,
        mode: "tint",
        alpha: 0.5,
      })
    );

    obj.applyFilters();
    canvas.requestRenderAll();
  } else {
    alert("Select image first");
  }
};
const changeFontFamily = (font) => {
  setFontFamily(font);

  if (!canvas) return;

  const obj = canvas.getActiveObject();

  if (obj && obj.type === "textbox") {
    obj.set("fontFamily", font);
    canvas.requestRenderAll();
  }
};

  return(
  <div style={styles.page}>
  <h2 style={styles.title}>🎨 Customize Your Design</h2>

  <div style={styles.toolbar}>
    <select onChange={(e) => changeFontFamily(e.target.value)}>
  <option value="Arial">Arial</option>
  <option value="Times New Roman">Times</option>
  <option value="Courier New">Courier</option>
  <option value="Verdana">Verdana</option>
</select>
    {Object.keys(PRODUCTS).map((key) => (
      <button
        key={key}
        onClick={() => setProduct(key)}
        style={{
          ...styles.productBtn,
          border:
            product === key
              ? "2px solid #2196f3"
              : "2px solid transparent",
        }}
      >
        {PRODUCTS[key].label}
      </button>
    ))}

<button style={styles.btn} onClick={addText}>✏️ Text</button>

<input
  type="color"
  value={textColor}
  onChange={(e) => handleColorChange(e.target.value)}
/>
{/* IMAGE UPLOAD */}
<label style={styles.fileBtn}>
  📤 Upload
  <input type="file" onChange={handleImageUpload} hidden />
</label>

<input
  type="color"
  onChange={(e) => changeImageColor(e.target.value)}
/>

<button style={styles.primaryBtn} onClick={saveDesign}>
  💾 Save
</button>

   <button style={styles.dangerBtn} onClick={deleteObject}>🗑 Delete</button>
   <button style={styles.primaryBtn} onClick={downloadImage}>
  ⬇ Download
</button>
  </div>

  {/* 🔥 NEW LAYOUT */}
  <div style={styles.editorLayout}>
    <div style={styles.canvasWrapper}>
      <canvas ref={canvasRef} />
    </div>
  </div>
</div>
  )
}
const styles = {
  page: {
    padding: "20px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    minHeight: "100vh",
    fontFamily: "Poppins, sans-serif",
  },

  title: {
    textAlign: "center",
    color: "#fff",
    marginBottom: "20px",
    fontSize: "26px",
  },

  toolbar: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "25px",
    background: "rgba(255,255,255,0.15)",
    padding: "12px",
    borderRadius: "12px",
    backdropFilter: "blur(10px)",
  },

  editorLayout: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  canvasWrapper: {
    background: "#fff",
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },

  productBtn: {
    padding: "10px 18px",
    borderRadius: "8px",
    background: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },

  btn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#333",
    color: "#fff",
    cursor: "pointer",
  },

  primaryBtn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(45deg, #2196f3, #21cbf3)",
    color: "#fff",
    cursor: "pointer",
  },

  dangerBtn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
    color: "#fff",
    cursor: "pointer",
  },

  fileBtn: {
    padding: "10px 16px",
    borderRadius: "8px",
    background: "linear-gradient(45deg, #00c853, #69f0ae)",
    color: "#fff",
    cursor: "pointer",
  },
};