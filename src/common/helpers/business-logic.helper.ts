/**
 * Helper untuk menghitung total harga dalam transaction
 */
export class PriceCalculationHelper {
  static calculateTotalFromItems(items: any[]): number {
    return items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }

  static applyDiscount(total: number, discountPercentage: number): number {
    return total * (1 - discountPercentage / 100);
  }

  static addTax(total: number, taxPercentage: number): number {
    return total * (1 + taxPercentage / 100);
  }
}

/**
 * Helper untuk validasi stock dan inventory
 */
export class InventoryHelper {
  static isStockSufficient(
    currentStock: number,
    requiredQuantity: number,
  ): boolean {
    return currentStock >= requiredQuantity;
  }

  static isStockLow(
    currentStock: number,
    minimumThreshold: number = 10,
  ): boolean {
    return currentStock <= minimumThreshold;
  }

  static calculateNewStock(
    currentStock: number,
    quantityChange: number,
  ): number {
    const newStock = currentStock - quantityChange;
    return newStock < 0 ? 0 : newStock;
  }
}

/**
 * Helper untuk location dan distance calculation
 */
export class LocationHelper {
  /**
   * Calculate distance between two coordinates in kilometers using Haversine formula
   */
  static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371; // Radius of Earth in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private static toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  /**
   * Find nearest pharmacies to user location
   */
  static findNearestPharmacies(
    userLat: number,
    userLon: number,
    pharmacies: any[],
    maxDistance: number = 10, // km
  ): any[] {
    return pharmacies
      .map((pharmacy) => ({
        ...pharmacy,
        distance: this.calculateDistance(
          userLat,
          userLon,
          Number(pharmacy.latitude),
          Number(pharmacy.longitude),
        ),
      }))
      .filter((pharmacy) => pharmacy.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);
  }
}

/**
 * Helper untuk transaction status management
 */
export class TransactionStatusHelper {
  static canTransitionTo(currentStatus: string, newStatus: string): boolean {
    const validTransitions = {
      PENDING: ['PAID', 'CANCELED'],
      PAID: ['CANCELED'],
      CANCELED: [],
    };

    return validTransitions[currentStatus]?.includes(newStatus) ?? false;
  }

  static getStatusMessage(status: string): string {
    const messages = {
      PENDING: 'Menunggu pembayaran',
      PAID: 'Sudah dibayar',
      CANCELED: 'Dibatalkan',
    };
    return messages[status] || 'Status tidak diketahui';
  }
}

/**
 * Helper untuk data formatting dan response
 */
export class FormattingHelper {
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  }

  static formatDate(date: Date): string {
    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  static parseTimeRange(timeRange: string): { start: string; end: string } {
    const [start, end] = timeRange.split('-');
    return { start: start?.trim() || '', end: end?.trim() || '' };
  }
}
