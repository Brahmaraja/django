import { supabase } from '../config/supabase.js';
import { validationResult } from 'express-validator';

export const getTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    const { data: tasks, error } = await supabase
      .from('tasks')
      .select(`
        *,
        assigned_to(id, username),
        comments(
          id,
          content,
          created_at,
          user:user_id(id, username)
        )
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { projectId } = req.params;
    const { title, description, status, priority, assignedTo, dueDate } = req.body;

    const { data: task, error } = await supabase
      .from('tasks')
      .insert({
        title,
        description,
        status,
        priority,
        assigned_to: assignedTo,
        project_id: projectId,
        due_date: dueDate
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: task, error } = await supabase
      .from('tasks')
      .select(`
        *,
        assigned_to(id, username),
        comments(
          id,
          content,
          created_at,
          user:user_id(id, username)
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, assignedTo, dueDate } = req.body;

    const { data: task, error } = await supabase
      .from('tasks')
      .update({
        title,
        description,
        status,
        priority,
        assigned_to: assignedTo,
        due_date: dueDate,
        updated_at: new Date()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};