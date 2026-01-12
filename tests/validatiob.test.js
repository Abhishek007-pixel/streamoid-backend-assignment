const { isValidProduct, buildSearchQuery } = require('../controllers/productController');

describe('1. Validation Logic (CSV Logic)', () => {
    
    test('should return true for a valid product row', () => {
        const row = {
            sku: "TEST-001", name: "T-Shirt", brand: "BrandX",
            color: "Blue", size: "M", mrp: "1000", price: "800", quantity: "10"
        };
        expect(isValidProduct(row)).toBe(true);
    });

    test('should return false if price > mrp', () => {
        const row = {
            sku: "TEST-002", name: "Bad Price", brand: "BrandX",
            color: "Red", size: "L", mrp: "500", price: "600", quantity: "10"
        };
        expect(isValidProduct(row)).toBe(false);
    });

    test('should return false for negative quantity', () => {
        const row = {
            sku: "TEST-003", name: "Bad Qty", brand: "BrandX",
            color: "Green", size: "S", mrp: "1000", price: "900", quantity: "-5"
        };
        expect(isValidProduct(row)).toBe(false);
    });
});

describe('2. Search Filter Logic', () => {

    test('should build query for Brand filter', () => {
        const query = { brand: 'Nike' };
        const result = buildSearchQuery(query);
        
        expect(result.sql).toContain('brand LIKE ?');
        expect(result.params).toContain('%Nike%');
    });

    test('should build query for Price Range', () => {
        const query = { minPrice: '100', maxPrice: '500' };
        const result = buildSearchQuery(query);

        expect(result.sql).toContain('price >= ?');
        expect(result.sql).toContain('price <= ?');
        expect(result.params).toEqual(['100', '500']);
    });

    test('should handle multiple filters (Brand + Color)', () => {
        const query = { brand: 'Adidas', color: 'Black' };
        const result = buildSearchQuery(query);

        expect(result.sql).toContain('brand LIKE ?');
        expect(result.sql).toContain('color LIKE ?');
        expect(result.params).toEqual(['%Adidas%', '%Black%']);
    });
});