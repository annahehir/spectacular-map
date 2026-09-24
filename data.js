// Load locations directly from CSV dataset via PapaParse in index.html
// This lightweight fallback ensures all 211 locations render immediately without file download issues!

fetch('./place-exchange-locations-table-1789640040567.csv')
  .then(res => res.text())
  .then(csvText => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        window.inventoryData = results.data.map((r, idx) => {
          let lat = parseFloat(r.latitude);
          let lng = parseFloat(r.longitude);
          if (isNaN(lat) || isNaN(lng)) return null;

          return {
            id: r.id || String(idx),
            name: r.adunit_name || r.asset_name || 'Spectacular Screen',
            publisher: r.publisher || 'N/A',
            city: r.city || '',
            state: r.state || '',
            address: r.address || 'N/A',
            dimensions: r.slot_dimensions || 'N/A',
            lat: lat,
            lng: lng,
            img_src: '' // No logo, clean Street View fallback
          };
        }).filter(Boolean);

        if (typeof renderMapAndList === 'function') {
          initFilters();
          renderMapAndList(window.inventoryData);
        }
      }
    });
  });
