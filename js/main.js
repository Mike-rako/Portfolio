/* ==========================================================================
   Logica del portafolio (version 2): renderiza las secciones desde PORTFOLIO
   (data.js) y gestiona idioma, tema, filtros, carrusel, formulario y brillo.
   ========================================================================== */
(function () {
  'use strict';
  var D = window.PORTFOLIO,
    P = D.profile,
    root = document.documentElement;
  var lang = read('lang') || (navigator.language.slice(0, 2) === 'en' ? 'en' : 'es');
  var filter = 'all';
  var SECTIONS = ['about', 'experience', 'skills', 'projects', 'contact'];

  /* Utilidades */
  function read(k) {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  }
  function write(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (e) {
      /* almacenamiento no disponible */
    }
  }
  function $(s) {
    return document.querySelector(s);
  }
  function t(v) {
    return v && typeof v === 'object' ? v[lang] : v;
  }
  function u(k) {
    return D.ui[lang][k] || k;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function chips(list) {
    return (
      '<ul class="chips">' +
      list
        .map(function (x) {
          return '<li>' + esc(x) + '</li>';
        })
        .join('') +
      '</ul>'
    );
  }
  function cell(i, cls, html) {
    return '<div class="cell gl ' + cls + '" style="--i:' + i + '">' + html + '</div>';
  }
  function head(title, extra) {
    return '<div class="hd"><h2>' + title + '</h2>' + (extra || '') + '</div>';
  }

  /* Navegacion */
  function renderNav() {
    $('#links').innerHTML = SECTIONS.map(function (s) {
      return '<a href="#' + s + '">' + u('nav_' + s) + '</a>';
    }).join('');
    $('#lang').textContent = u('lang_to');
  }

  /* Hero: nombre gigante y cuadricula bento (la cuadricula es el ancla "about") */
  function renderHero() {
    var a = t(P.about),
      stack = [];
    D.skills.forEach(function (g) {
      g.items.forEach(function (i) {
        stack.push(i.name);
      });
    });
    var marquee = stack
      .concat(stack)
      .map(function (s) {
        return '<span>' + esc(s) + '</span>';
      })
      .join('');
    var words = P.name
      .split(' ')
      .map(function (w, i, all) {
        return (
          '<span class="wd' +
          (i === all.length - 1 ? ' it' : '') +
          '"><b style="--i:' +
          i +
          '">' +
          esc(w) +
          '</b></span> '
        );
      })
      .join('');
    $('#hero').innerHTML =
      '<div class="w"><h1>' +
      words +
      '</h1><p class="role">' +
      t(P.role) +
      '</p><p class="lead">' +
      t(P.headline) +
      '</p>' +
      '<div class="bento" id="about">' +
      cell(
        0,
        'c-photo',
        '<img src="' + P.photo + '" alt="' + esc(P.name) + '" onerror="this.remove()">',
      ) +
      cell(1, 'c-about', '<p class="big">' + a[0] + '</p><p class="mu">' + (a[1] || '') + '</p>') +
      cell(
        2,
        'c-status',
        '<p><i class="dot"></i>' + t(P.status) + '</p><p class="mono">' + esc(P.location) + '</p>',
      ) +
      cell(
        3,
        'c-cv',
        '<a class="cvlink" href="' +
          t(P.cv) +
          '" download><span>' +
          u('cta_cv') +
          '</span><b>&#8599;</b></a>',
      ) +
      cell(4, 'c-marq', '<div class="marq">' + marquee + '</div>') +
      cell(5, 'c-soft', '<h3>' + u('soft_t') + '</h3>' + chips(t(P.soft))) +
      '</div></div>';
  }

  function renderExperience() {
    $('#experience').innerHTML =
      '<div class="w">' +
      head(u('exp_t')) +
      D.experience
        .map(function (e) {
          return (
            '<article class="ex rv"><div class="yr">' +
            esc(e.period) +
            '</div><div><h3>' +
            esc(e.company) +
            '</h3><p class="meta">' +
            t(e.role) +
            '</p><p>' +
            t(e.description) +
            '</p>' +
            chips(e.tags) +
            (e.certified ? '<p class="ok">' + u('certified') + '</p>' : '') +
            '</div></article>'
          );
        })
        .join('') +
      '</div>';
  }

  function renderSkills() {
    $('#skills').innerHTML =
      '<div class="w">' +
      head(u('skills_t')) +
      '<div class="sk">' +
      D.skills
        .map(function (g) {
          var bars = g.items.filter(function (i) {
              return i.level;
            }),
            tags = g.items.filter(function (i) {
              return !i.level;
            });
          return (
            '<div class="cell gl rv"><h3>' +
            t(g.group) +
            '</h3>' +
            bars
              .map(function (i) {
                return (
                  '<div class="bar"><p>' +
                  esc(i.name) +
                  '<span>' +
                  i.level +
                  '</span></p><div><i style="--w:' +
                  i.level +
                  '%"></i></div></div>'
                );
              })
              .join('') +
            (tags.length
              ? chips(
                  tags.map(function (i) {
                    return i.name;
                  }),
                )
              : '') +
            '</div>'
          );
        })
        .join('') +
      '</div></div>';
  }

  function card(p) {
    var links = p.links
      .map(function (l) {
        return (
          '<a href="' +
          l.url +
          '" target="_blank" rel="noopener">' +
          u(l.type === 'demo' ? 'demo' : 'code') +
          '</a>'
        );
      })
      .join('');
    return (
      '<article class="card gl" data-cat="' +
      p.categories.join(' ') +
      '"><div class="th">' +
      (p.image
        ? '<img src="' +
          p.image +
          '" alt="' +
          esc(t(p.title)) +
          '" loading="lazy" draggable="false" onerror="this.remove()">'
        : '') +
      '<span class="bd">' +
      u('type_' + p.type) +
      '</span></div>' +
      '<div class="cb"><h3>' +
      t(p.title) +
      '</h3><p>' +
      t(p.description) +
      '</p>' +
      chips(p.stack) +
      '</div>' +
      '<div class="cf">' +
      links +
      (p.confidential ? '<span>' + u('conf') + '</span>' : '') +
      '</div></article>'
    );
  }

  /* Proyectos: carrusel infinito. El conjunto de tarjetas se repite varias veces y, al llegar a
     un extremo, la posicion salta exactamente un conjunto de forma invisible. Avanza solo y
     despacio; se pausa al pasar el raton, arrastrar, usar la rueda, tocar o enfocar. */
  var rail = null,
    setW = 0,
    pos = 0,
    pauseUntil = 0,
    hovering = false,
    inView = true,
    lastTick = 0;
  var drag = { on: false, x: 0, start: 0, moved: 0 };
  var SPEED = 30; /* pixeles por segundo */
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function cardUnit() {
    return Math.min(390, window.innerWidth * 0.82) + 18;
  }

  function renderProjects() {
    /* Los filtros se generan a partir de las categorias usadas en los proyectos. */
    var cats = ['all'];
    D.projects.forEach(function (p) {
      p.categories.forEach(function (c) {
        if (cats.indexOf(c) < 0) cats.push(c);
      });
    });
    var filters =
      '<div class="fl" style="margin-bottom:26px">' +
      cats
        .map(function (c) {
          return '<button type="button" data-f="' + c + '">' + u('cat_' + c) + '</button>';
        })
        .join('') +
      '</div>';
    var arrows =
      '<div class="arrows"><button type="button" data-dir="-1" aria-label="Anterior">&larr;</button><button type="button" data-dir="1" aria-label="Siguiente">&rarr;</button></div>';
    $('#projects').innerHTML =
      '<div class="w">' +
      head(u('proj_t'), arrows) +
      filters +
      '</div><div class="rail" id="rail"></div>';
    rail = $('#rail');
    rail.addEventListener('scroll', wrap, { passive: true });
    rail.addEventListener('mouseenter', function () {
      hovering = true;
    });
    rail.addEventListener('mouseleave', function () {
      hovering = false;
      pos = rail.scrollLeft;
    });
    ['wheel', 'touchstart', 'touchmove', 'touchend'].forEach(function (n) {
      rail.addEventListener(
        n,
        function () {
          pauseUntil = performance.now() + 2500;
        },
        { passive: true },
      );
    });
    rail.addEventListener('focusin', function () {
      pauseUntil = performance.now() + 4000;
    });
    rail.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      drag.on = true;
      drag.moved = 0;
      drag.x = e.clientX;
      drag.start = rail.scrollLeft;
      /* La clase "drag" se activa en pointermove, solo si hay movimiento real; si no, desactiva los enlaces y el clic nunca llega */
    });
    /* Evita abrir un enlace cuando el gesto fue un arrastre */
    rail.addEventListener(
      'click',
      function (e) {
        if (drag.moved > 5) {
          e.preventDefault();
          e.stopPropagation();
        }
        drag.moved = 0;
      },
      true,
    );
    fillRail();
  }

  /* Dibuja las tarjetas filtradas, repetidas las veces necesarias para cubrir la pantalla */
  function fillRail() {
    var list = D.projects.filter(function (p) {
      return filter === 'all' || p.categories.indexOf(filter) >= 0;
    });
    document.querySelectorAll('.fl button').forEach(function (b) {
      b.classList.toggle('on', b.dataset.f === filter);
    });
    var one = list.map(card);
    var copies = Math.max(3, Math.ceil((3 * window.innerWidth) / (cardUnit() * list.length)));
    var html = '';
    for (var c = 0; c < copies; c++) {
      html +=
        c === 1
          ? one.join('')
          : one
              .map(function (h) {
                return h
                  .replace('<article class="card gl"', '<article class="card gl" aria-hidden="true"')
                  .replace(/<a href=/g, '<a tabindex="-1" href=');
              })
              .join('');
    }
    rail.innerHTML = html;
    setW = rail.children[list.length].offsetLeft - rail.children[0].offsetLeft;
    rail.scrollLeft = pos = setW;
  }

  /* Mantiene la posicion en el conjunto central saltando un conjunto completo */
  function wrap() {
    if (!setW) return;
    var d = rail.scrollLeft < setW * 0.5 ? setW : rail.scrollLeft >= setW * 1.5 ? -setW : 0;
    if (d) {
      rail.scrollLeft += d;
      pos += d;
      drag.start += d;
    }
  }

  /* Desplazamiento automatico lento hacia la izquierda */
  function tick(now) {
    var dt = Math.min(now - lastTick, 64) / 1000;
    lastTick = now;
    if (rail && setW) {
      if (
        !reduceMotion &&
        inView &&
        !hovering &&
        !drag.on &&
        now > pauseUntil &&
        !document.hidden
      ) {
        pos += SPEED * dt;
        rail.scrollLeft = pos;
      } else {
        pos = rail.scrollLeft;
      }
    }
    requestAnimationFrame(tick);
  }

  /* Flechas: desplazamiento suave de una tarjeta, compatible con el salto del bucle */
  function slide(dir) {
    pauseUntil = performance.now() + 3000;
    var dist = dir * cardUnit(),
      t0 = performance.now(),
      done = 0;
    (function step(now) {
      var p = Math.min((now - t0) / 500, 1),
        e = 1 - Math.pow(1 - p, 3),
        d = dist * e - done;
      done += d;
      rail.scrollLeft += d;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  function renderContact() {
    $('#contact').innerHTML =
      '<div class="w rv"><div class="ct"><div><h2>' +
      u('contact_t') +
      '</h2><p class="mu" style="margin-top:18px;max-width:40ch">' +
      u('contact_p') +
      '</p>' +
      '<a class="mail" href="mailto:' +
      P.email +
      '">' +
      esc(P.email) +
      '</a></div>' +
      '<form id="form" class="cell"><label>' +
      u('f_name') +
      '<input name="name" required></label><label>' +
      u('f_email') +
      '<input name="email" type="email" required></label>' +
      '<label>' +
      u('f_msg') +
      '<textarea name="message" required></textarea></label><button class="btn" type="submit">' +
      u('f_send') +
      '</button><p id="st" role="status"></p></form></div></div>';
  }

  function renderFooter() {
    var nav = SECTIONS.map(function (s) {
      return '<a href="#' + s + '">' + u('nav_' + s) + '</a>';
    }).join('');
    $('#footer').innerHTML =
      '<div class="w"><div class="fg"><div><a class="brand" href="#top">mb</a><p>' +
      u('foot_tag') +
      '</p></div>' +
      '<div><h4>' +
      u('foot_nav') +
      '</h4>' +
      nav +
      '</div>' +
      '<div><h4>' +
      u('foot_conn') +
      '</h4><a href="' +
      P.github +
      '" target="_blank" rel="noopener">GitHub</a><a href="' +
      P.linkedin +
      '" target="_blank" rel="noopener">LinkedIn</a><a href="mailto:' +
      P.email +
      '">' +
      u('foot_mail') +
      '</a></div></div>' +
      '<div class="fb"><span>\u00A9 ' +
      new Date().getFullYear() +
      ' ' +
      esc(P.name) +
      '. ' +
      u('rights') +
      '</span><span>' +
      esc(P.location) +
      '</span><a href="#top">' +
      u('foot_top') +
      '</a></div></div>' +
      '<div class="fw" aria-hidden="true">' +
      esc(P.name) +
      '</div>';
  }

  /* Aparicion al hacer scroll: una sola vez por elemento */
  var io =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          function (entries) {
            entries.forEach(function (e) {
              if (e.isIntersecting) {
                e.target.classList.add('in');
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.12 },
        )
      : null;

  function render() {
    root.lang = lang;
    renderNav();
    renderHero();
    renderExperience();
    renderSkills();
    renderProjects();
    renderContact();
    renderFooter();
    document.querySelectorAll('.rv').forEach(function (el) {
      io ? io.observe(el) : el.classList.add('in');
    });
  }

  /* Eventos delegados: sobreviven al re-renderizado al cambiar de idioma */
  document.addEventListener('click', function (e) {
    var f = e.target.closest('[data-f]'),
      d = e.target.closest('[data-dir]');
    if (f) {
      filter = f.dataset.f;
      fillRail();
    }
    if (d) {
      slide(Number(d.dataset.dir));
    }
    if (e.target.closest('#lang')) {
      lang = lang === 'es' ? 'en' : 'es';
      write('lang', lang);
      render();
    }
    if (e.target.closest('#theme')) {
      var n = root.dataset.theme === 'dark' ? 'light' : 'dark';
      root.dataset.theme = n;
      write('theme', n);
    }
    if (e.target.closest('#burger')) {
      $('#nav').classList.toggle('open');
    }
    if (e.target.closest('#links a')) {
      $('#nav').classList.remove('open');
    }
    var m = e.target.closest('a[href^="mailto:"]');
    if (m && navigator.clipboard && matchMedia('(hover: hover)').matches) {
      e.preventDefault();
      var label = m.textContent;
      navigator.clipboard
        .writeText(m.getAttribute('href').replace('mailto:', ''))
        .then(function () {
          m.textContent = u('copied');
          setTimeout(function () { m.textContent = label; }, 1800);
        })
        .catch(function () { window.location.href = m.href; });
    }
  });

  /* Brillo que sigue al cursor sobre tarjetas y celdas */
  document.addEventListener('mousemove', function (e) {
    var g = e.target.closest('.gl');
    if (!g) return;
    var r = g.getBoundingClientRect();
    g.style.setProperty('--mx', e.clientX - r.left + 'px');
    g.style.setProperty('--my', e.clientY - r.top + 'px');
  });

  document.addEventListener('submit', function (e) {
    if (e.target.id !== 'form') return;
    e.preventDefault();
    var form = e.target,
      st = $('#st');
    st.textContent = u('f_sending');
    fetch(P.formspree, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
    })
      .then(function (r) {
        if (!r.ok) throw new Error();
        form.reset();
        st.textContent = u('f_ok');
      })
      .catch(function () {
        st.textContent = u('f_err');
      });
  });

  render();
  window.addEventListener('pointermove', function (e) {
    if (!drag.on) return;
    drag.moved = Math.max(drag.moved, Math.abs(e.clientX - drag.x));
    if (drag.moved > 5) rail.classList.add('drag');
    rail.scrollLeft = drag.start - (e.clientX - drag.x);
  });
  window.addEventListener('pointerup', function () {
    if (!drag.on) return;
    drag.on = false;
    rail.classList.remove('drag');
    pos = rail.scrollLeft;
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      inView = en[0].isIntersecting;
    }).observe($('#projects'));
  }
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fillRail, 200);
  });
  requestAnimationFrame(tick);

  /* Intro de carga. Un clic la omite y pulsar el logotipo de la barra la reproduce de nuevo. */
  var introTimers = [];
  function endIntro() {
    root.classList.remove('intro');
    root.classList.add('intro-out');
  }
  function skipIntro() {
    root.classList.add('skip');
    endIntro();
  }
  function startIntro() {
    introTimers.forEach(clearTimeout);
    /* Se reemplaza el nodo para reiniciar sus animaciones y se vuelve a dibujar el hero */
    var old = $('.iris'),
      fresh = old.cloneNode(true);
    old.parentNode.replaceChild(fresh, old);
    fresh.addEventListener('click', skipIntro);
    root.classList.remove('intro-out', 'skip');
    root.classList.add('intro');
    renderHero();
    introTimers = [
      setTimeout(endIntro, 1900),
      /* Seguro: si las animaciones no se ejecutan, la intro nunca bloquea la pagina */
      setTimeout(function () {
        root.classList.add('skip');
        endIntro();
      }, 3300),
    ];
  }
  $('.iris').addEventListener('click', skipIntro);
  introTimers = [
    setTimeout(endIntro, 1900),
    setTimeout(function () {
      root.classList.add('skip');
      endIntro();
    }, 3300),
  ];
  /* Volver arriba: desplazamiento explicito, con respaldo por si el scroll suave se interrumpe */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('#footer a[href="#top"]');
    if (!a) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    setTimeout(function () {
      if (window.scrollY > 2) window.scrollTo({ top: 0, behavior: 'auto' });
    }, 1500);
  });
  document.addEventListener('click', function (e) {
    if (e.target.closest('.nav .brand')) {
      e.preventDefault();
      startIntro();
    }
  });
})();