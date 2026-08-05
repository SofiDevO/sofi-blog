import test from 'node:test';
import assert from 'node:assert/strict';

import { normalizePinterestUrl } from './pinterestUrl.js';

test('rewrite pinterest bookmarklet URL to canonical site domain', () => {
  const href = 'https://mx.pinterest.com/pin-builder/?media=https%3A%2F%2Fres.cloudinary.com%2Fdvjox4xut%2Fimages%2Ff_webp%2Cq_auto%2Fv1785542930%2Fimage-5_105380433%2Fimage-5_105380433.png%3F_i%3DAA&url=https%3A%2F%2Fsofiblog.sofidev.top%2Fmodule%2Fconfigurando-permisos-de-seguridad-en-nuestros-scripts%2F&description=Configurando+permisos+de+seguridad+en+nuestros+scripts&method=bookmarklet';

  const normalized = normalizePinterestUrl(href);

  assert.ok(normalized.includes('https://www.pinterest.com/pin-builder/'));
  assert.ok(normalized.includes('url=https%3A%2F%2Fsofidev.blog%2Fmodule%2Fconfigurando-permisos-de-seguridad-en-nuestros-scripts%2F'));
  assert.ok(!normalized.includes('sofiblog.sofidev.top'));
});

test('keep non-target URLs unchanged', () => {
  const href = 'https://www.pinterest.com/pin-builder/?url=https%3A%2F%2Fexample.com%2Fpost%2Ftest%2F&description=hello';

  const normalized = normalizePinterestUrl(href);

  assert.equal(normalized, href);
});
