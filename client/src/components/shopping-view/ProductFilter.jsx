import { FilterOptions } from "@/config";
import React from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFilter = ({filters, handleFilter}) => {
  return (
    <div className="bg-background rounded-xl border shadow-sm">
      {/* Header */}
      <div className="p-4">
        <h2 className="text-lg font-bold tracking-wide">Filters</h2>
      </div>

      <Separator />

      {/* Filter Body */}
      <div className="p-4 space-y-4">
        {Object.keys(FilterOptions).map((keyItem, index) => (
          <div key={keyItem} className="space-y-2">
            {/* Filter Title */}
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {keyItem}
            </h3>

            {/* Filter Options */}
            <div className="space-y-1">
              {FilterOptions[keyItem].map((option) => (
                <Label
                  key={option.id || option.value}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 text-sm font-medium hover:bg-muted transition-colors"
                >
                  <Checkbox 
                  checked={filters && Object.keys(filters).length > 0 ? (filters[keyItem] || []).includes(option.id) : false}
                  onCheckedChange={() => handleFilter(keyItem, option.id)}/>
                  <span>{option.label}</span>
                </Label>
              ))}
            </div>

            {/* Section separator */}
            {index !== Object.keys(FilterOptions).length - 1 && (
              <Separator className="mt-3" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
