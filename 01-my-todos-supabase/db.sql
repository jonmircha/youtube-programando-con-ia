-- Crear tabla users
create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Crear tabla todos
create table todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  title text not null,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Permitir insertar solo si el usuario está creando su propio registro
CREATE POLICY "Insert own user record"
ON public.users
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Permitir leer solo su propio registro
CREATE POLICY "Read own user record"
ON public.users
FOR SELECT
USING (auth.uid() = id);

-- Permitir actualizar solo su propio registro
CREATE POLICY "Update own user record"
ON public.users
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Ver solo las tareas propias
CREATE POLICY "Select own todos"
ON public.todos
FOR SELECT
USING (auth.uid() = user_id);

-- Insertar tareas sólo si el user_id coincide con el UID autenticado
CREATE POLICY "Insert own todos"
ON public.todos
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Actualizar solo sus propias tareas
CREATE POLICY "Update own todos"
ON public.todos
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Eliminar solo sus propias tareas
CREATE POLICY "Delete own todos"
ON public.todos
FOR DELETE
USING (auth.uid() = user_id);
