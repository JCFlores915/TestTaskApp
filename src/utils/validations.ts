  // plus para corregir la url de la imagen
  export const fixUrl = (url: string) => {
    if (url.includes('https://cloudflare-ipfs.com/ipfs')) {
      return url.replace('https://cloudflare-ipfs.com/ipfs', 'https://ipfs.io/ipfs');
    } else {
      const randomId = Math.floor(Math.random() * 1000);
      return `https://ipfs.io/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${randomId}.jpg`;
    }
  }

