/**
 * EntropyUtils — shared utilities for entropy lecture interactive diagrams.
 *
 * Loaded via <script src> in HTML pages; all utilities live on the global
 * namespace window.EntropyUtils.
 */
window.EntropyUtils = {
  COLORS: {
    up: '#58c4dd',
    down: '#fc6255',
    left: '#f5d742',
    right: '#83c167'
  },

  LABELS: {
    up: '上 ↑',
    down: '下 ↓',
    left: '左 ←',
    right: '右 →'
  },

  /**
   * Normalize raw symbol weights to probabilities summing to 1.
   * @param {{up:number, down:number, left:number, right:number}} raw
   * @returns {{up:number, down:number, left:number, right:number}}
   */
  normalizeProbs(raw) {
    const sum = raw.up + raw.down + raw.left + raw.right;
    return {
      up: raw.up / sum,
      down: raw.down / sum,
      left: raw.left / sum,
      right: raw.right / sum
    };
  },

  /**
   * Shannon entropy in bits: H = -Σ p log₂(p).
   * @param {{up:number, down:number, left:number, right:number}} probs
   * @returns {number}
   */
  calcEntropy(probs) {
    let entropy = 0;
    for (const key of ['up', 'down', 'left', 'right']) {
      const p = probs[key];
      if (p > 0) {
        entropy -= p * Math.log2(p);
      }
    }
    return entropy;
  },

  /**
   * Build Huffman codes for the four directional symbols.
   * @param {{up:number, down:number, left:number, right:number}} probs
   * @returns {Array<{key:string, label:string, color:string, p:number, code:string, len:number}>}
   */
  huffmanCodes(probs) {
    const items = [
      { key: 'up', label: this.LABELS.up, color: this.COLORS.up, p: probs.up },
      { key: 'down', label: this.LABELS.down, color: this.COLORS.down, p: probs.down },
      { key: 'left', label: this.LABELS.left, color: this.COLORS.left, p: probs.left },
      { key: 'right', label: this.LABELS.right, color: this.COLORS.right, p: probs.right }
    ];

    items.forEach(it => { it.code = ''; });

    let nodes = items.map(it => ({ weight: it.p, items: [it] }));
    while (nodes.length > 1) {
      nodes.sort((a, b) => a.weight - b.weight);
      const left = nodes.shift();
      const right = nodes.shift();
      left.items.forEach(it => { it.code = '0' + it.code; });
      right.items.forEach(it => { it.code = '1' + it.code; });
      nodes.push({ weight: left.weight + right.weight, items: left.items.concat(right.items) });
    }

    items.forEach(it => { it.len = it.code.length; });
    return items;
  },

  /**
   * Build a prefix-code tree from Huffman-coded items.
   * @param {Array<{code:string}>} items
   * @returns {{depth:number, prefix:string, children:Object, leaf:Object|null, x:number, y:number, w:number}}
   */
  buildPrefixTree(items) {
    const root = { depth: 0, prefix: '', children: {}, leaf: null, x: 0, y: 0, w: 0 };
    items.forEach(it => {
      let node = root;
      for (const bit of it.code) {
        if (!node.children[bit]) {
          node.children[bit] = {
            depth: node.depth + 1,
            prefix: node.prefix + bit,
            children: {},
            leaf: null,
            x: 0,
            y: 0,
            w: 0
          };
        }
        node = node.children[bit];
      }
      node.leaf = it;
    });
    return root;
  },

  /**
   * Lay out the prefix tree top-down, mutating node {x, y, w} in place.
   * @param {Object} node
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} levelHeight
   */
  layoutPrefixTree(node, x, y, w, levelHeight) {
    node.x = x;
    node.y = y;
    node.w = w;

    if (node.leaf) return;

    const left = node.children['0'];
    const right = node.children['1'];

    if (left && right) {
      this.layoutPrefixTree(left, x - w / 4, y + levelHeight, w / 2, levelHeight);
      this.layoutPrefixTree(right, x + w / 4, y + levelHeight, w / 2, levelHeight);
    } else if (left) {
      this.layoutPrefixTree(left, x, y + levelHeight, w, levelHeight);
    } else if (right) {
      this.layoutPrefixTree(right, x, y + levelHeight, w, levelHeight);
    }
  },

  /**
   * Draw stacked probability bars for the four symbols.
   * @param {CanvasRenderingContext2D} ctx
   * @param {{up:number, down:number, left:number, right:number}} probs
   * @param {number} x
   * @param {number} y
   * @param {number} w
   * @param {number} h
   */
  drawProbabilityBars(ctx, probs, x, y, w, h) {
    const items = [
      { key: 'up', label: this.LABELS.up, color: this.COLORS.up },
      { key: 'down', label: this.LABELS.down, color: this.COLORS.down },
      { key: 'left', label: this.LABELS.left, color: this.COLORS.left },
      { key: 'right', label: this.LABELS.right, color: this.COLORS.right }
    ];

    let cy = y;
    items.forEach(item => {
      const p = probs[item.key];
      const hItem = p * h;

      ctx.fillStyle = item.color;
      ctx.globalAlpha = 0.85;
      ctx.fillRect(x, cy, w, hItem);

      ctx.globalAlpha = 1;
      ctx.strokeStyle = '#f0f0f5';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, cy, w, hItem);

      ctx.fillStyle = '#f0f0f5';
      ctx.font = '600 14px "Noto Serif SC", serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${item.label}  ${(p * 100).toFixed(1)}%`, x + 10, cy + hItem / 2 + 5);

      cy += hItem;
    });
  },

  /**
   * Draw the prefix code tree (edges + nodes) on a canvas.
   * @param {CanvasRenderingContext2D} ctx
   * @param {Object} root
   * @param {number} maxDepth — available for callers; node positions are pre-computed
   */
  drawPrefixTree(ctx, root, maxDepth) {
    const treeW = root.w;

    function drawEdges(node) {
      Object.values(node.children).forEach(child => {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(child.x, child.y);
        ctx.strokeStyle = 'rgba(240,240,245,0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const mx = (node.x + child.x) / 2;
        const my = (node.y + child.y) / 2;
        const bit = child.prefix.slice(-1);
        ctx.fillStyle = '#a0a0b8';
        ctx.font = '600 13px "Fira Code", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(bit, mx + (child.x > node.x ? 10 : -10), my + 4);

        drawEdges(child);
      });
    }
    drawEdges(root);

    function drawNodes(node) {
      if (node.leaf) {
        const it = node.leaf;
        const codeSpaceW = Math.pow(2, -it.len) * treeW;
        const leafW = Math.max(52, codeSpaceW - 4);
        const leafH = 52;
        const lx = node.x - leafW / 2;
        const ly = node.y - 6;

        ctx.fillStyle = it.color;
        ctx.globalAlpha = 0.14;
        ctx.fillRect(lx, ly, leafW, leafH);

        ctx.globalAlpha = 1;
        ctx.strokeStyle = it.color;
        ctx.lineWidth = 2;
        ctx.strokeRect(lx, ly, leafW, leafH);

        ctx.fillStyle = '#f0f0f5';
        ctx.textAlign = 'center';
        if (leafW >= 80) {
          ctx.font = '600 15px "Fira Code", monospace';
          ctx.fillText(`${it.label} = ${it.code}`, node.x, ly + 22);
          ctx.font = '400 12px "Fira Code", monospace';
          ctx.fillText(`${it.len} bits`, node.x, ly + 42);
        } else {
          ctx.font = '600 12px "Fira Code", monospace';
          ctx.fillText(`${it.code}`, node.x, ly + 22);
          ctx.font = '400 11px "Noto Serif SC", serif';
          ctx.fillText(`${it.label} · ${it.len}b`, node.x, ly + 40);
        }
        return;
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#f0f0f5';
      ctx.fill();

      Object.values(node.children).forEach(drawNodes);
    }
    drawNodes(root);
  }
};
