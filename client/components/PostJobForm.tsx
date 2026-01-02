'use client';

import { useState } from 'react';
import { useJobStore } from '@/store/useJobStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Need to install or simulate
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function PostJobForm() {
  const { createJob } = useJobStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    salaryRange: '',
    location: '',
    type: 'full-time',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createJob({
        ...formData,
        requirements: formData.requirements.split(',').map(s => s.trim())
    });
    // Reset form
    setFormData({
        title: '',
        description: '',
        requirements: '',
        salaryRange: '',
        location: '',
        type: 'full-time',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post a New Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
              <Label>Job Title</Label>
              <Input 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                placeholder="e.g. Senior React Developer" 
                required 
              />
          </div>
          <div className="space-y-2">
             <Label>Description</Label>
             <Input 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                placeholder="Job details..."
             />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label>Location</Label>
                <Input value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="e.g. Remote / Hargeisa" />
            </div>
            <div className="space-y-2">
                <Label>Salary Range</Label>
                <Input value={formData.salaryRange} onChange={(e) => setFormData({...formData, salaryRange: e.target.value})} placeholder="e.g. $2000 - $4000" />
            </div>
          </div>
          <div className="space-y-2">
             <Label>Requirements (comma separated)</Label>
             <Input value={formData.requirements} onChange={(e) => setFormData({...formData, requirements: e.target.value})} placeholder="React, Node.js, TypeScript" />
          </div>
          <div className="space-y-2">
              <Label>Type</Label>
               <Select onValueChange={(val) => setFormData({...formData, type: val})} value={formData.type}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          
          <Button type="submit">Post Job</Button>
        </form>
      </CardContent>
    </Card>
  );
}
