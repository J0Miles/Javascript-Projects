var canvas, ctx, count, ban, iscli, sx, sy, poi, kata, isma, gcir, typ, nx, ny, psize;

(function() {
  var a, b, tx, ty;
  canvas = document.getElementsByTagName('canvas')[0];
  ctx = canvas.getContext('2d');
  canvas.width = canvas.height = 500;

  a = Object.getOwnPropertyNames(Math);
  for (b = 0; b < a.length; b++) window[a[b]] = Math[a[b]];

  if (navigator.userAgent.indexOf('iPhone') > 0 ||
    navigator.userAgent.indexOf('iPad') > 0 ||
    navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
    canvas.addEventListener('touchstart', mdn);
    canvas.addEventListener('touchmove', mmv);
    canvas.addEventListener('touchend', mup);
    document.body.removeEventListener('touchmove', 0, false);
    isma = 1;
    psize = 20;
  } else {
    //document.onmouseup=function(){nowpo=0;};
    canvas.addEventListener('mouseup', mup);
    canvas.addEventListener('mousemove', mmv);
    canvas.addEventListener('mousedown', mdn);
    psize = 10;
  }

  tx = canvas.width / 2;
  ty = canvas.height / 2;

  a = {};
  a.p = [tx, ty];
  a.han = 160;
  gcir = a;

  poi = [tx + 0.1, ty + 0.1];

  kata = [
    [8, 3],
    [4, 5],
    [6, 4],
    [3, 7]
  ];

  typ = 0;
  aaa();

})();

function mup(e) {
  iscli = 0;
}

function mdn(e) {
  var x, y;
  loc(e);
  sx = nx - poi[0];
  sy = ny - poi[1];
  if (pow(sx * sx + sy * sy, 0.5) < psize) {
    iscli = 1;
  } else {
    typ = (typ + 1) % kata.length;
  }
}

function mmv(e) {
  loc(e);
  if (iscli == 1) {
    poi[0] = nx + sx;
    poi[1] = ny + sy;
  }
}

function loc(e) {
  var a, b, x, y, sx, sy, rect;
  sx = document.body.scrollLeft || document.documentElement.scrollLeft;
  sy = document.body.scrollTop || document.documentElement.scrollTop;

  if (isma) {
    x = e.changedTouches[0].pageX - canvas.offsetLeft;
    y = e.changedTouches[0].pageY - canvas.offsetTop;

  } else {

    x = e.clientX - canvas.offsetLeft + sx;
    y = e.clientY - canvas.offsetTop + sy;
  }
  rect = e.target.getBoundingClientRect();
  a = rect.width;
  b = rect.height;
  nx = (x / a * canvas.width) | 0;
  ny = (y / b * canvas.height) | 0;
}

function aaa() {
  var a, b, c;

  gen = 100;
  b = kata[typ];
  a = gcir;

  ctx.beginPath();
  hyp(b[0], b[1], a, poi[0] - a.p[0], poi[1] - a.p[1], 0);
  ctx.stroke();

  ctx.fillStyle = "#000";
  maru(poi, psize);
  requestAnimationFrame(aaa);
}

function hyp(p, q, cir, px, py, pr) {
  var a, b, c, d, e, f, g, han, tx, ty, tp, pt, r, x, y, o, ban, ch;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  han = cir.han;
  tx = cir.p[0];
  ty = cir.p[1];
  d = sqrt(cos(PI / p + PI / q) * cos(PI / q) / (sin(2 * PI / q) * sin(PI / p) + cos(PI / p + PI / q) * cos(PI / q)));
  d *= cir.han;
  tp = cir.p;

  pt = [];
  r = pr * PI * 2 / p;
  for (a = 0; a < p; a++) {
    x = cos(r) * d;
    y = sin(r) * d;
    pt.push([tp[0] + x, tp[1] + y]);
    r += PI * 2 / p;
  }

  if (px || py) {
    r = atan2(py, px);
    b = sqrt(px * px + py * py) / cir.han;

    if (b > 1) {
      a = [tx + px, ty + py];
      b = htn(cir, a);
      px = b[0] - tx;
      py = b[1] - ty;
      b = sqrt(px * px + py * py) / cir.han;
    }

    if (b > 0.99) b = 0.99;
    b = atanh(b) / 2;
    b = tanh(b);
    b *= cir.han;
    px = cos(r) * b;
    py = sin(r) * b;

    a = [tx + px, ty + py];
    b = htn(cir, a);
    o = {};
    o.p = getp(a, b);
    o.han = kyo(a, b) / 2;
    pt = htns(o, pt);
  }

  b = htns(cir, pt);
  ban = 0;
  ch = [];
  syk(b, 0, tp);

  function syk(pt, kai, ttp) {
    var a, b, c, d, e, f, g, h, ht, i, p, x, y, mb, stp, pt2, x1, y1, x2, y2;

    ban++;
    if (kai > gen) return;
    if (ban > 10000) return;

    p = pt.length;
    pt2 = htns(cir, pt);
    x = y = 0;
    for (a = 0; a < p; a++) {
      b = pt2[a];
      x += b[0];
      y += b[1];
    }

    x1 = floor(x * 100);
    y1 = floor(y * 100);

    d = [];
    for (a = -1; a < 2; a++) {
      y2 = y1 + a;
      for (b = -1; b < 2; b++) {
        x2 = x1 + b;
        c = x2 + "a" + y2;
        if (ch[c]) return;
        d.push(c);
      }
    }

    for (a = 0; a < d.length; d++) ch[d[a]] = 1;

    kai++;
    i = sns(pt, 1);
    ht = [];
    for (a = 0; a < p; a++) {
      b = pt[(a + 0) % p];
      c = pt[(a + 1) % p];
      e = i[a];
      h = [c, b];
      for (f = 0; f < p - 2; f++) {
        g = pt[(a - 1 + p - f) % p];
        g = htn(e, g);
        h.push(g);
      }

      g = htn(e, ttp);
      f = mns(h);
      if (!(f < 4 && kai > 6)) ht.push([h, f, g]);
    }

    ht = sou(ht);
    for (a = 0; a < ht.length; a++) {
      b = ht[a];
      syk(b[0], kai, b[2], ban);
    }

    sns(pt2);

    function sns(pt, soto) {
      var a, b, c, d, e, f, g, i, p;

      p = pt.length;
      i = [];
      f = 0;
      for (a = 0; a < p; a++) {
        b = pt[(a) % p];
        c = pt[(a + 1) % p];
        d = htn(cir, b);
        e = nai(b, c, d);
        i.push(e);
        if (e.kyo > 500) f = 1;
      }

      if (!f) {
        b = pt[0];
        ctx.moveTo(b[0], b[1]);

        for (a = 0; a < p; a++) {
          b = i[a];
          if (b.kyo > 500) break;

          if (b.sn) {
            ctx.lineTo(b.sn[0][0], b.sn[0][1]);
            ctx.lineTo(b.sn[1][0], b.sn[1][1]);
          } else {
            ctx.arc(b.p[0], b.p[1], b.han, b.sk, b.ek, b.c);
          }
        }
      }

      return i;
    }

  } //syk

  function nai(p1, p2, p3) {
    var a, b, c, x, y, x1, y1, x2, y2, x3, y3, px, py, han, sk, ek, o, ura;
    o = {};
    x1 = p1[0];
    y1 = p1[1];
    x2 = p2[0];
    y2 = p2[1];
    x3 = p3[0];
    y3 = p3[1];
    y = (x1 - x3) * (x1 * x1 - x2 * x2 + y1 * y1 - y2 * y2) - (x1 - x2) * (x1 * x1 - x3 * x3 + y1 * y1 - y3 * y3);
    a = (2 * (x1 - x3) * (y1 - y2) - 2 * (x1 - x2) * (y1 - y3));
    y = y / a;
    x = (y1 - y3) * (y1 * y1 - y2 * y2 + x1 * x1 - x2 * x2) - (y1 - y2) * (y1 * y1 - y3 * y3 + x1 * x1 - x3 * x3);
    b = (2 * (y1 - y3) * (x1 - x2) - 2 * (y1 - y2) * (x1 - x3));
    x = x / b;
    px = x1 - x;
    py = y1 - y;
    han = Math.pow(px * px + py * py, 0.5);

    o.kyo = kyo(p1, p2);
    if (!a || !b) {
      o.sn = [p1, p2];
      return o;
    }

    sk = atan2(py, px);
    ek = atan2(y2 - y, x2 - x);

    c = 0;
    a = (sk - ek + PI * 20) % (PI * 2);
    b = (ek - sk + PI * 20) % (PI * 2);
    if (a < b) c = 1;

    ura = 1;
    if (kyo(p2, cir.p) > cir.han) ura = -1;


    a = nsk(cir.p, p1, p2);
    c = (a * ura > 0);

    o.p = [x, y];
    o.han = han;
    o.sk = sk;
    o.ek = ek;
    o.c = c;

    if (han > 10000000) {
      o.sn = [p1, p2];
      return o;
    }

    return o;
  }

} //hyp

function kaku(p1, p2) {
  var a, x, y;

  x = p2[0] - p1[0];
  y = p2[1] - p1[1];
  a = atan2(y, x) + PI * 2;

  return a;
}

function htn(o, p2) {

  var a, x, y, px, py, m, han2, p1, r, k;


  if (o.sn) {
    if (!o.r) o.r = kaku(o.sn[0], o.sn[1]);
    r = kaku(o.sn[0], p2);
    k = kyo(o.sn[0], p2);
    a = r - o.r;
    a = o.r - a;
    x = cos(a) * k;
    y = sin(a) * k;
    return [o.sn[0][0] + x, o.sn[0][1] + y];
  }

  p1 = o.p;
  if (!o.h2) o.h2 = o.han * o.han;
  han2 = o.h2;
  px = p2[0] - p1[0];
  py = p2[1] - p1[1];
  a = px * px + py * py;
  if (!a) return p1;

  m = han2 / a;
  x = p1[0] + px * m;
  y = p1[1] + py * m;
  return [x, y];
}

function htns(o, pt) {
  var a, b, c, d, x, y, px, py, m, han2, p2;
  c = [];
  for (a = 0; a < pt.length; a++) {
    c.push(htn(o, pt[a]));
  }
  return c;
}

function mns(p) {
  var a, b, c, d, x, y, x1, y1, x2, y2;

  x = p[0][0];
  y = p[0][1];
  d = 0;
  for (a = 0; a < p.length - 2; a++) {
    b = p[a + 1];
    c = p[a + 2];
    x1 = b[0] - x;
    y1 = b[1] - y;
    x2 = c[0] - x;
    y2 = c[1] - y;

    d += x1 * y2 - x2 * y1;
  }
  return abs(d);
}

function nsk(p1, p2, p3) {
  x = p1[0];
  y = p1[1];
  x1 = p2[0] - x;
  y1 = p2[1] - y;
  x2 = p3[0] - x;
  y2 = p3[1] - y;
  d = x1 * y2 - x2 * y1;
  return d;
}

function getp(a, b, c) {
  var x, y, d, e;
  if (c === undefined) c = 0.5;
  e = [];
  for (d = 0; d < a.length; d++) {
    e.push((b[d] - a[d]) * c + a[d]);
  }
  return e;
}

function kyo(p1, p2) {
  var x, y;
  x = p1[0] - p2[0];
  y = p1[1] - p2[1];
  return Math.pow(x * x + y * y, 0.5);
}

function maru(p, s) {
  ctx.beginPath();
  ctx.arc(p[0], p[1], s, 0, Math.PI * 2, 0);
  ctx.fill();
}

function sou(q) {
  var a, b, p1;
  p1 = [];
  for (a = 0; a < q.length; a++) {

    for (b = 0; b < p1.length; b++) {
      if (q[a][1] > p1[b][1]) {
        for (c = p1.length - 1; c >= b; c--) {
          p1[c + 1] = p1[c];
        }
        p1[b] = q[a];
        break;
      }
    }
    if (b == p1.length) p1.push(q[a]);
  }

  return p1;
}
