"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Need to install or simulate if not present, using span for now if failed

export default function TalentSearch() {
  const [talents, setTalents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTalents = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users/talents");
        if (res.ok) {
          const data = await res.json();
          setTalents(data);
        }
      } catch (error) {
        console.error("Failed to load talents");
      } finally {
        setLoading(false);
      }
    };
    fetchTalents();
  }, []);

  const filteredTalents = talents.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.headline?.toLowerCase().includes(search.toLowerCase()) ||
      t.bio?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Find Talent</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Input
          placeholder="Search by name or title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid md:grid-cols-2 gap-4">
          {loading ? (
            <p>Loading talent...</p>
          ) : (
            filteredTalents.map((talent) => (
              <div
                key={talent._id}
                className="p-4 border rounded-lg bg-white shadow-sm flex flex-col gap-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{talent.name}</h3>
                    <p className="text-sm text-gray-500">
                      {talent.headline || "No headline"}
                    </p>
                  </div>
                  {/* 
                          Ideally we verify skills here by fetching UserSkill 
                          or including it in the /talents response.
                          For MVP, we just show location
                        */}
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {talent.bio || "No bio available"}
                </p>
                <div className="text-xs text-gray-400 mt-auto pt-2">
                  {talent.location || "Remote"}
                </div>
              </div>
            ))
          )}
          {!loading && filteredTalents.length === 0 && (
            <p className="text-gray-500">
              No talents found matching your search.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
