"use client";

import { useState, useEffect } from "react";
import TalentCard from "@/components/TalentCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePublicDataStore } from "@/store/usePublicDataStore";

export default function TalentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { talents, fetchTalents, isLoading } = usePublicDataStore();
  const [visibleCount, setVisibleCount] = useState(6);
  const [verifiedOnly, setVerifiedOnly] = useState(true); // Default matching UI

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // Debounced Search & Filter Effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchTalents({
        search: searchTerm,
        verified: verifiedOnly
      });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, verifiedOnly, fetchTalents]);

  const FilterSidebar = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Availability</h3>
        <div className="space-y-3">
          {["Full-time", "Part-time", "Contract", "Hourly"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={`type-${type}`} />
              <Label
                htmlFor={`type-${type}`}
                className="font-normal cursor-pointer text-slate-600 dark:text-slate-400"
              >
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Hourly Rate</h3>
        <div className="space-y-4">
          <Slider defaultValue={[30]} max={100} step={1} className="w-full" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>$0</span>
            <span>$100+/hr</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Verification</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="verified-only"
            checked={verifiedOnly}
            onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
          />
          <Label htmlFor="verified-only" className="font-medium cursor-pointer text-green-700 dark:text-green-400">
            Verified Talent Only
          </Label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold font-heading tracking-tight text-slate-900 dark:text-white">Find Verified Talent</h1>
            <p className="text-muted-foreground mt-1">
              Found {talents.length} professionals ready to work.
            </p>
          </div>

          <div className="flex w-full md:w-auto gap-2">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, skill, title..."
                className="pl-9 bg-white dark:bg-slate-950"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Mobile Filter Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden shrink-0 bg-white dark:bg-slate-950"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your search</SheetDescription>
                </SheetHeader>
                <div className="py-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block col-span-1">
            <div className="sticky top-24 bg-white dark:bg-slate-950 p-6 rounded-lg border shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-muted-foreground hover:text-destructive"
                  onClick={() => {
                    setSearchTerm("");
                    setVerifiedOnly(false);
                  }}
                >
                  Reset
                </Button>
              </div>
              <FilterSidebar />
            </div>
          </div>

          {/* Freelancer Grid */}
          <div className="col-span-1 md:col-span-3">
            {isLoading ? (
              <div className="text-center py-20 text-muted-foreground">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="h-4 w-32 bg-slate-200 rounded mb-4"></div>
                  <div className="h-4 w-24 bg-slate-200 rounded"></div>
                </div>
                <p className="mt-4">Loading top talent...</p>
              </div>
            ) : talents.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {talents.slice(0, visibleCount).map((talent) => (
                    <TalentCard
                      key={talent._id}
                      id={talent._id}
                      name={talent.name}
                      title={talent.headline || "Talent"}
                      location={talent.location || "Remote"}
                      rate="$35/hr" // Mock value
                      // @ts-ignore
                      verified={talent.verificationStage === "VERIFIED"} // Actual backend verified check
                      score={95} // Mock score or derive from skills if populated
                      skills={talent.skills?.map((s: any) => s.skillId.name).slice(0, 3) || []}
                      reviews={12} // Mock
                      rating={4.9} // Mock
                    />
                  ))}
                </div>

                {/* Pagination / Load More */}
                {visibleCount < talents.length && (
                  <div className="pt-12 flex justify-center">
                    <Button
                      variant="outline"
                      size="lg"
                      className="min-w-[200px]"
                      onClick={handleLoadMore}
                    >
                      Load More Talent
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white dark:bg-slate-950 rounded-lg border border-dashed">
                <p className="text-muted-foreground">No talent found matching your criteria.</p>
                {verifiedOnly && <p className="text-sm text-yellow-600 mt-2">Try unchecking "Verified Talent Only" to see more results.</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
