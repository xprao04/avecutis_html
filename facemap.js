/**
 * Interactive Face Map (exploratory feature — self-contained).
 *
 * Customers tap/click a face region (forehead, eyelids, lips) to see the
 * aesthetic procedures available for that area, then expand a procedure for
 * its description. Prices are intentionally omitted for now and rendered as
 * "Cena na konzultaci".
 *
 * To remove the feature: delete this file + facemap.css, and the #face-map
 * section + its <link>/<script> lines in index.html.
 */
(function () {
    'use strict';

    // Single source of truth for the feature's content.
    var FACE_MAP_DATA = {
        forehead: {
            label: 'Čelo',
            procedures: [
                { name: 'Botulotoxin – mimické vrásky', desc: 'Vyhlazení vrásek na čele a mezi obočím.' },
                { name: 'Výplně kyselinou hyaluronovou', desc: 'Korekce hlubokých vrásek.' }
            ]
        },
        eyelids: {
            label: 'Oční víčka',
            procedures: [
                { name: 'Blefaroplastika', desc: 'Chirurgická operace očních víček.' },
                { name: 'Nucleofill Soft Eyes', desc: 'Polynukleotidy – hydratace oční oblasti.' },
                { name: 'Plexr', desc: 'Plazmový generátor – nechirurgické zpevnění.' }
            ]
        },
        lips: {
            label: 'Rty',
            procedures: [
                { name: 'Výplně rtů', desc: 'Modelace a hydratace kyselinou hyaluronovou.' }
            ]
        }
    };

    var PRICE_TEXT = 'Cena na konzultaci';

    var section = document.getElementById('face-map');
    if (!section) { return; }

    var panel = section.querySelector('#facemapPanel');
    var regions = section.querySelectorAll('.facemap-region');

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function renderRegion(regionId) {
        var data = FACE_MAP_DATA[regionId];
        if (!data) { return; }

        var html = '<div class="fm-eyebrow">Dostupné zákroky</div>' +
            '<h3>' + escapeHtml(data.label) + '</h3>';

        data.procedures.forEach(function (proc, i) {
            var bodyId = 'fm-proc-' + regionId + '-' + i;
            html +=
                '<div class="fm-proc">' +
                    '<button type="button" class="fm-proc-toggle" aria-expanded="false" aria-controls="' + bodyId + '">' +
                        '<span>' + escapeHtml(proc.name) + '</span>' +
                        '<span class="fm-chevron" aria-hidden="true">›</span>' +
                    '</button>' +
                    '<div class="fm-proc-body" id="' + bodyId + '">' +
                        '<p class="fm-proc-desc">' + escapeHtml(proc.desc) + '</p>' +
                        '<p class="fm-proc-price">' + PRICE_TEXT + '</p>' +
                    '</div>' +
                '</div>';
        });

        panel.innerHTML = html;
        bindAccordion();
    }

    function bindAccordion() {
        var items = panel.querySelectorAll('.fm-proc');
        panel.querySelectorAll('.fm-proc-toggle').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var proc = btn.closest('.fm-proc');
                var willOpen = !proc.classList.contains('is-open');
                // Single-open: collapse every procedure first so the panel
                // never grows taller than the face (keeps the section height stable).
                items.forEach(function (it) {
                    it.classList.remove('is-open');
                    var t = it.querySelector('.fm-proc-toggle');
                    if (t) { t.setAttribute('aria-expanded', 'false'); }
                });
                if (willOpen) {
                    proc.classList.add('is-open');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    function selectRegion(region) {
        regions.forEach(function (r) {
            r.classList.remove('is-active');
            r.setAttribute('aria-pressed', 'false');
        });
        region.classList.add('is-active');
        region.setAttribute('aria-pressed', 'true');
        renderRegion(region.getAttribute('data-region'));
    }

    regions.forEach(function (region) {
        region.addEventListener('click', function () { selectRegion(region); });
        region.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                selectRegion(region);
            }
        });
    });
})();
